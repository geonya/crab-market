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

# Prisma

https://www.prisma.io/

1. Node.js and Typescript ORM(Object Relational Mapping)
   => JS or TS 와 데이터베이스 사이에 다리를 놓아줌 (기본적으로 번역기의 역할을 한다고 생각하면 됨)

2. Prisma를 사용하기 위해서는 먼저 Prisma에게 DB가 어떻게 생겼는지, 데이터의 모양을 설명해줘야 함 => schema.prisma

3. Prisma가 이런 타입에 관한 정보를 알고 있으면 client를 생성해줄 수 있음. client를 이용하면 TS로 DB와 직접 상호작용 가능, 자동완성 제공.

4. Prisma Studio : Visual Database Browser, DB를 위한 관리자 패널같은 것.

# Planet Scale

https://planetscale.com/

# React Hook Form

https://react-hook-form.com/api/useform

```
pscale connect crab-market
```

```typescript
<input
	{...register("email", {
		required: "Email is required.",
		validate: {
			notGmail: (value) =>
				!value.includes("@gmail.com") || "Gmail is not allowed",
		},
	})}
	type="email"
	placeholder="Email"
	className={`${
		Boolean(errors.email?.message)
			? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
			: ""
	}`}
/>
```

##### shortcut

string -> number

```typescript
user = await client.user.create({
	data: {
		name: "Anonymous",
		phone: +phone,
	},
});
```

+"1241" = 1241
1241 + "" = "1241
