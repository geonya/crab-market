import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { idText } from "typescript";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method === "GET") {
		const products = await client.product.findMany({});
		res.json({
			ok: true,
			products,
		});
	}
	if (req.method === "POST") {
		const {
			body: { name, price, description, photoId },
			session: { user },
		} = req;
		const product = await client.product.create({
			data: {
				name,
				price: +price,
				description,
				image: photoId,
				user: {
					connect: {
						id: user?.id,
					},
				},
			},
		});
		await client.record.create({
			data: {
				user: {
					connect: {
						id: user?.id,
					},
				},
				product: {
					connect: {
						id: product.id,
					},
				},
				kind: "Sale",
			},
		});
		res.json({
			ok: true,
			product,
		});
	}
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
