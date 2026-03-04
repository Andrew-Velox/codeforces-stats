import axios from "axios";
import fs from "fs";
import path from "path";
import { get_stats } from "@/fetcher.js";
import themes from "@/themes.js";
import {
  renderTemplate,
  get_color_from_rating,
  CONSTANTS,
  clamp_value,
} from "@/common.js";

const TAG_COLORS = ["#06b6d4", "#ec4899", "#eab308"];
const DONUT_C = 2 * Math.PI * 70; // circumference for r=70

export default async function handler(req, res) {
  let {
    username,
    force_username,
    theme = "default",
    title_color,
    text_color,
    icon_color,
    border_color,
    bg_color,
    tag_1_color,
    tag_2_color,
    tag_3_color,
    chart_total_color,
    box_border_color,
    cache_seconds,
    disable_animations,
    show_icons,
  } = req.query;

  if (themes[theme] == undefined) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
    res.status(404).send("Theme not found");
    return;
  }

  const cacheSeconds = clamp_value(
    parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
    CONSTANTS.FOUR_HOURS,
    CONSTANTS.ONE_DAY
  );

  try {
    const {
      username: handle,
      fullName,
      rating,
      maxRating,
      rank,
      maxRank,
      contestsCount,
      problemsSolved,
      submissions,
      friendOfCount,
      contribution,
      topTags,
      totalTagCount,
      titlePhoto,
      registrationTimeSeconds,
    } = await get_stats(username, cacheSeconds);

    // Fetch & base64-encode the avatar image
    let avatar_b64 = "";
    try {
      const avatarRes = await axios.get(titlePhoto, {
        responseType: "arraybuffer",
        timeout: 2000,
      });
      const contentType =
        avatarRes.headers["content-type"] || "image/jpeg";
      avatar_b64 = `data:${contentType};base64,${Buffer.from(
        avatarRes.data
      ).toString("base64")}`;
    } catch (_) {
      // No avatar available — the fallback circle bg is shown
    }

    res.setHeader("Content-Type", "image/svg+xml");

    if (process.env.NODE_ENV === "development") {
      res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
    } else {
      res.setHeader(
        "Cache-Control",
        `max-age=${cacheSeconds / 2}, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`
      );
    }

    const name = handle; // Always use handle as metadata name
    const year = registrationTimeSeconds
      ? new Date(registrationTimeSeconds * 1000).getFullYear()
      : "N/A";

    const rankColor = get_color_from_rating(rating);
    const maxRankColor = get_color_from_rating(maxRating);

    // Donut chart — Concentric Overlap Strategy.
    const tags = [
      topTags[0] || { name: "-", count: 0 },
      topTags[1] || { name: "-", count: 0 },
      topTags[2] || { name: "-", count: 0 },
    ];
    // Calculate total count of only the top 3 tags (as requested by user)
    // Percentages are relative to this sum (i.e. top 3 tags sum up to 100% of chart)
    const tagSum = tags.reduce((s, t) => s + t.count, 0) || 1;
    
    // L1: Arc length for Tag 1 (Largest)
    const L1 = (tags[0].count / tagSum) * DONUT_C;
    // L2: Arc length for Tag 2 (Middle)
    const L2 = (tags[1].count / tagSum) * DONUT_C;
    // Tag 3 fills the remainder (base layer)

    // Note: Offsets handled via `transform="rotate(-90)"` in SVG to start at 12 o'clock.
    // Zero offsets used in template variables.

    // Resolve Theme & Colors
    const themeConfig = {
      ...themes["default"],
      ...themes[theme],
      ...(title_color && { title_color }),
      ...(text_color && { text_color }),
      ...(icon_color && { icon_color }),
      ...(border_color && { border_color }),
      ...(bg_color && { bg_color }),
      ...(tag_1_color && { tag_1_color }),
      ...(tag_2_color && { tag_2_color }),
      ...(tag_3_color && { tag_3_color }),
      ...(chart_total_color && { chart_total_color }),
      ...(box_border_color && { box_border_color }),
    };

    if (!themeConfig.chart_total_color) {
      themeConfig.chart_total_color = themeConfig.title_color;
    }

    // Tag colors: Use theme overriding existing constants if present
    // Note: TAG_COLORS has '#' prefix; theme colors usually do not. 
    const t1Color = themeConfig.tag_1_color ? `#${themeConfig.tag_1_color}` : TAG_COLORS[0];
    const t2Color = themeConfig.tag_2_color ? `#${themeConfig.tag_2_color}` : TAG_COLORS[1];
    const t3Color = themeConfig.tag_3_color ? `#${themeConfig.tag_3_color}` : TAG_COLORS[2];
    
    let logo_b64 = "";
    try {
      const imgPath = path.join(process.cwd(), "src", "images", "logo.png");
      const imgBuffer = fs.readFileSync(imgPath);
      logo_b64 = `data:image/png;base64,${imgBuffer.toString("base64")}`;
    } catch (err) {
      console.error("Failed to read logo image:", err);
    }

    res.send(
      renderTemplate("card.svg", {
        logo_b64,
        name,
        handle,
        year,
        contest_rating: rating,
        max_rating: maxRating,
        rank,
        max_rank: maxRank,
        contests: contestsCount,
        accepted: problemsSolved,
        contributions: contribution,
        rank_color: rankColor,
        max_rank_color: maxRankColor,
        rank_color_dark: rankColor,
        max_rank_color_dark: maxRankColor,
        avatar_b64,
        full_name: fullName, // Pass raw full name for subtitle
        tag1_name: tags[0].name,
        tag1_count: tags[0].count,
        tag1_color: t1Color,
        tag1_dash: `${L1.toFixed(2)} ${DONUT_C.toFixed(2)}`,
        tag1_offset: "0",
        tag2_name: tags[1].name,
        tag2_count: tags[1].count,
        tag2_color: t2Color,
        tag2_dash: `${(L1 + L2).toFixed(2)} ${DONUT_C.toFixed(2)}`,
        tag2_offset: "0",
        tag3_name: tags[2].name,
        tag3_count: tags[2].count,
        tag3_color: t3Color,
        tag3_dash: `0 0`, 
        tag3_offset: "0",
        animation: true,    // Force animation enabled
        show_icons: true,   // Force icons enabled
        theme: themeConfig,
      })
    );
  } catch ({ status, error }) {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
    res.status(status).send(error);
  }
}

