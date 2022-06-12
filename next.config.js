/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");

const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  images: {
    domains: ["dl.airtable.com"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

module.exports = nextConfig;
