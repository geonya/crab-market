/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		reactRoot: true,
	},
};

module.exports = nextConfig;
