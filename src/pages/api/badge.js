import axios from "axios";
import { get_stats } from "@/fetcher.js";
import themes from "@/themes.js";
import {
  renderTemplate,
  get_color_from_rating,
  CONSTANTS,
  clamp_value,
} from "@/common.js";



export default async function handler(req, res) {
  const { username, cache_seconds, theme = "default", bg_color } = req.query;

  const cacheSeconds = clamp_value(
    parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
    CONSTANTS.FOUR_HOURS,
    CONSTANTS.ONE_DAY
  );

  if (!themes[theme]) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.status(404).send("Theme not found");
    return;
  }

  try {
    const { username: handle, rating, rank, titlePhoto } = await get_stats(username, cacheSeconds);

    let avatar_b64 = "";
    try {
      const avatarRes = await axios.get(titlePhoto, {
        responseType: "arraybuffer",
        timeout: 2000,
      });
      const contentType = avatarRes.headers["content-type"] || "image/jpeg";
      avatar_b64 = `data:${contentType};base64,${Buffer.from(avatarRes.data).toString("base64")}`;
    } catch (_) {}

    res.setHeader("Content-Type", "image/svg+xml");
    if (process.env.NODE_ENV === "development") {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    } else {
      res.setHeader(
        "Cache-Control",
        `max-age=${cacheSeconds / 2}, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`
      );
    }

    res.send(
      renderTemplate("badge.svg", {
        handle,
        rating,
        color: get_color_from_rating(rating),
        max_rank_color: get_color_from_rating(rating),
        bg_color: bg_color || themes[theme].bg_color,
        title_color: themes[theme].title_color,
        avatar_b64,
      })
    );
  } catch ({ status, error }) {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.status(status).send(error);
  }
}
