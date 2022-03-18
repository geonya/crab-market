import type { NextPage } from "next";
import LayOut from "@components/layout";
import ProductList from "@components/product-list";
import useSWR from "swr";
import { Record } from "@prisma/client";

interface SoldResponse {
	ok: boolean;
	sales: Record;
}

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
