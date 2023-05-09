/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
