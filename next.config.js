/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		reactRoot: "concurrent",
	},
	images: {
		domains: ["imagedelivery.net", "videodelivery.net"],
	},
};

module.exports = nextConfig;
