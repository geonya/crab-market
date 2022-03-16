module.exports = {
	content: [
		"./pages/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class", // media 로 변경시 system config 를 따라감
	plugins: [
		require("@tailwindcss/forms"),
		require("tailwind-scrollbar-hide"),
	],
};
