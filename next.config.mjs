/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Your Rails port
        pathname: "/rails/active_storage/**",
      },
    ],
  },
};

export default nextConfig;
