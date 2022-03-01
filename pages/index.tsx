import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import LayOut from "@components/layout";
import useUser from "@libs/client/useUser";
import Head from "next/head";

const Home: NextPage = () => {
	const { user, isLoading } = useUser();
	return (
		<LayOut title="Home" hasTabBar>
			<Head>
				<title>Home</title>
			</Head>
			<div className="flex flex-col space-y-5 divide-y-[1px]">
				{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
					<Item
						id={i}
						key={i}
						title="iPhone 20"
						price={99}
						comments={1}
						hearts={1}
					></Item>
				))}
				<FloatingButton href="/items/upload">
					<svg
						className="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
				</FloatingButton>
			</div>
		</LayOut>
	);
};

export default Home;
