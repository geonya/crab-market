import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		query: { id },
		session: { user },
	} = req;
	const alreadyExists = await client.record.findFirst({
		where: {
			productId: +id.toString(),
			userId: user?.id,
			kind: "Fav",
		},
	});
	if (alreadyExists) {
		await client.record.delete({
			where: {
				id: alreadyExists.id,
			},
		});
	} else {
		await client.record.create({
			data: {
				user: {
					connect: {
						id: user?.id,
					},
				},
				product: {
					connect: {
						id: +id.toString(),
					},
				},
				kind: "Fav",
			},
		});
	}
	const fav = await client.record.count({
		where: {
			productId: +id.toString(),
			kind: "Fav",
		},
	});
	await client.product.update({
		where: {
			id: +id.toString(),
		},
		data: {
			favCount: fav,
		},
	});
}
export default withApiSession(
	withHandler({
		methods: ["POST"],
		handler,
	})
);
