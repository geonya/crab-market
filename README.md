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

# tailwind CSS JIT feature

```css
bg-[url('/vercel.svg')]
text-[200px] text-[#eeeeee]
```

# divide

형제 요소가 있으면 border 를 줌

```css

chat.tsx

divide-y-2

```

### 화면 비율로 자동으로 사이즈 맞추기

```html
<div className="w-full bg-slate-300 aspect-square rounded-full" />
```

### margin 보다는 space 를 쓰는 것이 좋다.

```html
<div className="px-4 space-y-5 py-10"></div>
```

### 5.16 mobile only layout \_app.tsx

```html
<div className="w-full max-w-xl mx-auto">
	<Component {...pageProps} />
</div>
```
