/** @type {import('next').NextConfig} */
import { networkInterfaces } from "os";

function getServerIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

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
  env: {
    // if the backend url env is local host, then replace with server ip so that testing on mobile using laptop backend
    NEXT_PUBLIC_BACKEND_URL:
      process.env.NEXT_PUBLIC_BACKEND_URL?.replace(
        "localhost",
        getServerIP()
      ) || "",
  },
};

export default nextConfig;
