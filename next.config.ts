import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "souqak.runasp.net",
      },
      {
        protocol: "https",
        hostname: "souqak.runasp.net",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
