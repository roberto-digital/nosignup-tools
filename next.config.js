/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");

const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  images: {
    domains: ["dl.airtable.com"],
  },
});

module.exports = nextConfig;
