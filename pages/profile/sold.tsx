import type { NextPage } from "next";
import Item from "@components/item";
import LayOut from "@components/layout";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
	return (
		<LayOut seoTitle="판매내역" canGoBack hasTabBar>
			<div className="flex flex-col space-y-5 py-10">
				<ProductList kind="sales" />
			</div>
		</LayOut>
	);
};

export default Sold;
