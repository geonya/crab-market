import type { NextPage } from "next";
import LayOut from "@components/layout";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
	return (
		<LayOut seoTitle="구매목록" canGoBack hasTabBar>
			<div className="flex flex-col space-y-5 py-10">
				<ProductList kind="purchases" />
			</div>
		</LayOut>
	);
};

export default Sold;
