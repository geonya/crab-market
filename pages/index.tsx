import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import LayOut from "@components/layout";

import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";
import Image from "next/image";
import apple from "../public/apple.jpg";

interface ProductsResponse {
	ok: boolean;
	products: Product[];
}

const Home: NextPage = () => {
	const { data } = useSWR<ProductsResponse>(`/api/products`);
	return (
		<LayOut title="Home" hasTabBar>
			<Head>
				<title>Home</title>
			</Head>
			<div className="flex flex-col space-y-5 divide-y-[1px]">
				{data?.products?.map((product) => (
					<Item
						id={product.id}
						key={product.id}
						title={product.name}
						price={product.price}
						comments={product.commentsCount}
						hearts={product.favCount}
					></Item>
				))}
				<FloatingButton href="/products/upload">
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
			<Image src={apple} placeholder="blur" quality={10} />
		</LayOut>
	);
};

export default Home;
