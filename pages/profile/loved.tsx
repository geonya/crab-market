import type { NextPage } from "next";
import Item from "@components/item";
import LayOut from "@components/layout";

const Loved: NextPage = () => {
	return (
		<LayOut canGoBack title="Loved Items">
			<div className="flex flex-col space-y-5 py-10">
				{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
					<Item
						key={i}
						id={i}
						title="iPhone 20"
						price={99}
						comments={i}
						hearts={1}
					/>
				))}
			</div>
		</LayOut>
	);
};

export default Loved;
