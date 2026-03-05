import { get_rating_history } from "@/fetcher.js";
import themes from "@/themes.js";
import fs from "fs";
import path from "path";
import {
  renderTemplate,
  get_color_from_rating,
  COLORS,
  CONSTANTS,
  clamp_value,
} from "@/common.js";

const CHART_WIDTH = 420;
const CHART_HEIGHT = 115;
const HANDLE_CHAR_LIMIT = 12; // Threshold for switching to compressed template

const RATING_BANDS = [
  { min: 0, max: 1200, color: COLORS.NEWBIE },
  { min: 1200, max: 1400, color: COLORS.PUPIL },
  { min: 1400, max: 1600, color: COLORS.SPECIALIST },
  { min: 1600, max: 1900, color: COLORS.EXPERT },
  { min: 1900, max: 2100, color: COLORS.CANDIDATE_MASTER },
  { min: 2100, max: 2300, color: COLORS.MASTER },
  { min: 2300, max: 2400, color: COLORS.INTERNATIONAL_MASTER },
  { min: 2400, max: 2600, color: COLORS.GRANDMASTER },
  { min: 2600, max: 5000, color: COLORS.INTERNATIONAL_GRANDMASTER },
];

export default async function handler(req, res) {
  let {
    username,
    theme = "default",
    title_color,
    text_color,
    icon_color,
    border_color,
    bg_color,
    cache_seconds,
  } = req.query;

  if (!themes[theme]) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.status(404).send("Theme not found");
    return;
  }

  const cacheSeconds = clamp_value(
    parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
    CONSTANTS.FOUR_HOURS,
    CONSTANTS.ONE_DAY
  );

  try {
    const { handle, rating, maxRating, ratingChanges } =
      await get_rating_history(username, cacheSeconds);

    if (!ratingChanges || ratingChanges.length === 0) {
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.status(400).send("No rating history available");
      return;
    }

    // ── Data points ──────────────────────────────────────────
    const points = ratingChanges.map((rc) => ({
      time: rc.ratingUpdateTimeSeconds,
      rating: rc.newRating,
    }));

    // ── X scale (time) ──────────────────────────────────────
    let minTime = points[0].time;
    let maxTime = points[points.length - 1].time;
    if (points.length === 1) {
      const pad = 86400 * 30; // 30-day padding for a single contest
      minTime -= pad;
      maxTime += pad;
    }
    const timeRange = maxTime - minTime || 1;

    // ── Y scale (rating) ────────────────────────────────────
    const allRatings = points.map((p) => p.rating);
    const dataMin = Math.min(...allRatings);
    const dataMax = Math.max(...allRatings);
    const ratingPad = Math.max(100, (dataMax - dataMin) * 0.2);
    let yMin = Math.floor((dataMin - ratingPad) / 100) * 100;
    let yMax = Math.ceil((dataMax + ratingPad) / 100) * 100;
    yMin = Math.max(0, yMin);
    if (yMax - yMin < 200) yMax = yMin + 200;
    const yRange = yMax - yMin;

    // ── Map to chart coordinates ────────────────────────────
    const chartPoints = points.map((p, i, arr) => ({
      x: +(((p.time - minTime) / timeRange) * CHART_WIDTH).toFixed(1),
      y: +(((yMax - p.rating) / yRange) * CHART_HEIGHT).toFixed(1),
      color: get_color_from_rating(p.rating),
      isLast: i === arr.length - 1,
    }));

    // ── SVG paths ───────────────────────────────────────────
    const linePath = chartPoints
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
      .join(" ");

    const lastPt = chartPoints[chartPoints.length - 1];
    const firstPt = chartPoints[0];
    const areaPath = `${linePath} L${lastPt.x},${CHART_HEIGHT} L${firstPt.x},${CHART_HEIGHT} Z`;

    // ── Y-axis ticks ────────────────────────────────────────
    const yTickStep = yRange <= 400 ? 100 : yRange <= 1000 ? 200 : 400;
    const yTicks = [];
    for (let r = yMin; r <= yMax; r += yTickStep) {
      yTicks.push({
        y: +(((yMax - r) / yRange) * CHART_HEIGHT).toFixed(1),
        label: r,
      });
    }

    // ── X-axis ticks ────────────────────────────────────────
    const numXTicks = Math.min(7, Math.max(2, points.length));
    const xTicks = [];
    const usedLabels = new Set();
    for (let i = 0; i < numXTicks; i++) {
      const t = minTime + (i / (numXTicks - 1)) * timeRange;
      const x = +(((t - minTime) / timeRange) * CHART_WIDTH).toFixed(1);
      const date = new Date(t * 1000);
      const label = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      if (!usedLabels.has(label)) {
        usedLabels.add(label);
        xTicks.push({ x, label });
      }
    }

    // ── Rating bands (background color zones) ───────────────
    const ratingBands = RATING_BANDS.map((band) => {
      const bandTop = Math.min(band.max, yMax);
      const bandBottom = Math.max(band.min, yMin);
      if (bandBottom >= bandTop) return null;
      const y = +(((yMax - bandTop) / yRange) * CHART_HEIGHT).toFixed(1);
      const height = +(
        ((bandTop - bandBottom) / yRange) *
        CHART_HEIGHT
      ).toFixed(1);
      return { y, height, color: band.color };
    }).filter(Boolean);

    // ── Theme config ────────────────────────────────────────
    const lineColor = get_color_from_rating(rating);
    const maxRankColor = get_color_from_rating(maxRating);

    let logo_b64 = "";
    try {
      const imgPath = path.join(process.cwd(), "src", "images", "logo.png");
      const imgBuffer = fs.readFileSync(imgPath);
      logo_b64 = `data:image/png;base64,${imgBuffer.toString("base64")}`;
    } catch (err) {
      console.error("Failed to read logo image:", err);
    }

    const themeConfig = {
      ...themes["default"],
      ...themes[theme],
      ...(title_color && { title_color }),
      ...(text_color && { text_color }),
      ...(icon_color && { icon_color }),
      ...(border_color && { border_color }),
      ...(bg_color && { bg_color }),
    };

    // ── Response ────────────────────────────────────────────
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
      renderTemplate(
        handle && handle.length <= HANDLE_CHAR_LIMIT
          ? "default/graph.svg"
          : "compressed/graph.svg",
        {
          handle,
          logo_b64,
          line_color: lineColor,
          max_rank_color: maxRankColor,
          line_path: linePath,
          area_path: areaPath,
          dots: chartPoints,
          y_ticks: yTicks,
          x_ticks: xTicks,
          rating_bands: ratingBands,
          theme: themeConfig,
        }
      )
    );
  } catch ({ status, error }) {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.status(status).send(error);
  }
}
