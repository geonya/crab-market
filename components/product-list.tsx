import { Product } from "@prisma/client";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
	kind: "favs" | "sales" | "purchases";
}

interface RecordKind {
	id: number;
	product: Product;
}

interface ProductListResponse {
	[key: string]: RecordKind[];
}

export default function ProductList({ kind }: ProductListProps) {
	const { data } = useSWR<ProductListResponse>(
		`/api/users/me/records?kind=${kind}`
	);
	return data ? (
		<>
			{data[kind]?.map((record) => (
				<Item
					key={record.id}
					id={record.product.id}
					title={record.product.name}
					price={record.product.price}
					hearts={record.product.favCount}
					comments={record.product.commentsCount}
					image={record.product.image}
				/>
			))}
		</>
	) : null;
}
