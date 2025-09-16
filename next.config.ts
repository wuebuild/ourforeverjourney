const { i18n } = require("./next-i18next.config");
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n,
  images: {
    domains: ["images.unsplash.com"], // 👈 add Unsplash or any external source
  },
};

export default nextConfig;
