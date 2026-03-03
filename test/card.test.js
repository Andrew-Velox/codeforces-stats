import { jest } from "@jest/globals";
import { CONSTANTS, COLORS, clamp_value } from "@/common.js";
import {user} from "./test-data.js";

jest.unstable_mockModule("@/fetcher-utils", () => {
  return {
    api: {
      get: jest.fn()
    },
    last_rating_cache: {set: jest.fn(), get: jest.fn()},
    last_stats_cache: {set: jest.fn(), get: jest.fn()},
  };
});

const { api, last_stats_cache } = await import("@/fetcher-utils.js");
const handler = (await import("@/pages/api/card.js")).default;

describe("card handler", () => {
  let req, res;

  beforeEach(() => {
    req = {
      query: {
        username: "yalniz",
        cache_seconds: "18000",
        force_username: true,
      },
    };

    res = {
      setHeader: jest.fn(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should return a valid SVG response with proper headers", async () => {
    let cacheSeconds = parseInt(
      req.query.cache_seconds || CONSTANTS.FOUR_HOURS,
      10
    );
    cacheSeconds = clamp_value(
      cacheSeconds,
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY
    );

    api.get.mockImplementation((url,params) => {
      if (url.includes("user.info")) 
        return Promise.resolve({data:user.info});
      if (url.includes("user.rating")) 
        return Promise.resolve({data:user.rating});
      if (url.includes("user.status"))
        return Promise.resolve({data:user.status});
    });

    await handler(req, res);

    document.body.innerHTML = res.send.mock.calls[0][0];
    const name = document.querySelector("#name").textContent;
    const rating = document.querySelector("#rating").textContent;
    const maxRating = document.querySelector("#max-rating").textContent;
    const rank = document.querySelector("#rank").textContent;
    const contests = document.querySelector("#contests").textContent;
    const problemsSolved = document.querySelector("#problems-solved").textContent;
    const contribution = document.querySelector("#contribution").textContent;

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`
    );
    expect(name).toBe("yalniz");
    expect(rating).toBe("1386");
    expect(maxRating).toBe("1386");
    expect(rank).toBe("Pupil");
    expect(contests).toBe("5");
    expect(problemsSolved).toBe("26");
    expect(contribution).toBe("0");
  });

  it("should handle Codeforces server error and send a text response with error message", async () => {
    api.get.mockRejectedValue({
      response: {
        status: 403,
      },
    });
    last_stats_cache.get = () => {
      return new Promise((resolve) => {
        resolve(undefined);
      })
    };

    const promise = handler(req, res);

    jest.advanceTimersByTime(3000);

    await promise;

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/plain");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Codeforces Server Error");
  });

  it("should handle Codeforces handle not found error and send a text response with error message", async () => {
    api.get.mockRejectedValue({
      response: {
        status: 400,
      },
    });
    last_stats_cache.get = () => undefined;

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/plain");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Codeforces Handle Not Found");
  });
});

