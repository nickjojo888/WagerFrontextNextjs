/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Test for .svg files
      use: [
        {
          loader: "@svgr/webpack", // Use the svgr/webpack loader
          options: {
            icon: true, // Optional: Set this to true if your SVGs are primarily icons
          },
        },
      ],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
