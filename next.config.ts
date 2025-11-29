import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export", // Enable static export for GitHub Pages
	images: {
		unoptimized: true, // Required for static export
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cataas.com",
			},
		],
	},
};

export default nextConfig;
