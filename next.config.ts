const { i18n } = require("./next-i18next.config");
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n,
  images: {
    domains: ["images.unsplash.com", "ourforeverjourney.s3.ap-southeast-1.amazonaws.com"], // 👈 add Unsplash or any external source
  },
  async headers() {
    return [
      {
        // Apply only to files under /public/videos/*
        source: "/videos/:file*",
        headers: [
          // Long-lived edge+browser caching; change filename when you update the video.
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },

          // Usually **not** needed; your host will set these automatically:
          // { key: "Accept-Ranges", value: "bytes" },
          // { key: "Content-Type", value: "video/mp4" },
        ],
      },
    ];
  },
};

export default nextConfig;
