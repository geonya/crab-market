/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		reactRoot: "concurrent",
	},
};

module.exports = nextConfig;
