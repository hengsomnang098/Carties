import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  logging:{
    fetches:{
      fullUrl:true
    }
  },
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'cdn.pixabay.com'},
      
    ],
    formats: ['image/webp', 'image/avif'],
  },
};

export default bundleAnalyzer(withFlowbiteReact(nextConfig));