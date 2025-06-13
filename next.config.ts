import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
        ignoreBuildErrors: true,
      },
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'img.clerk.com',
      'subdomain',
      'files.stripe.com',
      'res.cloudinary.com'
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
