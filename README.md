# Crab Market

2022.02.24

npx create-next-app@latest —typescript
npm i next@latest react@rc react-dom@rc next 최신 버전과 react 18 rc 버전 설치
npm install -D tailwindcss postcss autoprefixer  
rm -rf .git default git repository 삭제
git init ~ git remote add origin ~~

tailwind.config.js

module.exports = {
content: [
"./pages/**/*.{js,jsx,ts,tsx}",
"./components/**/*.{js,jsx,ts,tsx}",
],
theme: {
extend: {},
},
plugins: [],
};

reactRoot error shooting (by NextJS lastest update)

const nextConfig = {
reactStrictMode: true,
experimental: {
reactRoot: true,
},
};

```html
<button
	className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition"
/>
```
