/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.thecatapi.com",
        port: "",
        pathname: "v1/images/",
      },
    ],
  },
};

module.exports = nextConfig;
