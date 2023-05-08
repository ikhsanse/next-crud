/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    env: {
        url: process.env.BASE_URL,
      },
}


module.exports = nextConfig
