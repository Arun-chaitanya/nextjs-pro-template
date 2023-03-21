/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const withPWA = require("next-pwa")({ dest: "public", disable: isDev });
const nextTranslate = require("next-translate-plugin");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
];

const middlewares = [nextTranslate, withPWA];

const nextConfig = {
  swcMinify: true,
  images: { loader: "custom" },
  redirects: () => [
    { source: "/iccwt20", destination: "/campaign/ICCWT20", permanent: false },
    { source: "/play/flash", destination: "/play", permanent: false },
    { source: "/privacy", destination: "/privacy-policy", permanent: true },
    { source: "/terms", destination: "/terms-of-use", permanent: true },
    { source: "/marketplace", destination: "/market", permanent: true },
    { source: "/marketplace/search", destination: "/market/nfts", permanent: true },
    { source: "/marketplace/teams", destination: "/market/teams", permanent: true },
    { source: "/marketplace/tournaments", destination: "/market/tournaments", permanent: true },
    { source: "/marketplace/moment/:slug", destination: "/market/nfts/:slug", permanent: true },
    { source: "/marketplace/moment/sales/:slug", destination: "/market/nfts/:slug", permanent: true },
    { source: "/moment/:id", destination: "/nft/:id", permanent: true },
    { source: "/moment/sales/:id", destination: "/nft/:id", permanent: true },
    { source: "/moment/status/:hash", destination: "/nft/status/:hash", permanent: true },
    { source: "/packs/:route*", destination: "/market/packs", permanent: true },
    { source: "/flash/:route*", destination: "/play", permanent: true },
    { source: "/collection/:userId*", destination: "/market/collection/:userId*", permanent: true },
    { source: "/wallet/settings", destination: "/settings/wallet", permanent: true },
  ],
  headers: () => [
    { source: "/:path*", headers: securityHeaders },
    { source: "/frame/:path*", headers: [{ key: "X-Frame-Options", value: "ALLOWALL" }] },
  ],
  experimental: { scrollRestoration: true },
};

module.exports = middlewares.reduce((config, f) => f(config), nextConfig);
