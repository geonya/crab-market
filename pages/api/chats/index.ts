import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method === "GET") {
		const {
			session: { user },
		} = req;
		const chats = await client.chat.findMany({
			where: {
				OR: [
					{
						user: {
							id: user?.id,
						},
					},
					{
						product: {
							userId: user?.id,
						},
					},
				],
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatar: true,
					},
				},
				product: {
					select: {
						id: true,
						name: true,
						user: {
							select: {
								name: true,
								avatar: true,
							},
						},
					},
				},
				messages: {},
			},
		});
		res.json({
			ok: true,
			chats,
		});
	}
	if (req.method === "POST") {
		const {
			body: { productId },
			session: { user },
		} = req;
		const currentChat = await client.chat.findFirst({
			where: {
				product: {
					id: productId,
				},
				user: {
					id: user?.id,
				},
			},
		});
		if (currentChat) {
			return res.json({
				ok: false,
				currentChat,
			});
		}
		const product = await client.product.findUnique({
			where: {
				id: productId,
			},
			include: {
				user: {
					select: {
						id: true,
					},
				},
			},
		});
		if (product?.user.id === user?.id) {
			return res.json({
				ok: false,
				error: "You can't make chat room in your product",
			});
		}
		const chat = await client.chat.create({
			data: {
				product: {
					connect: {
						id: productId,
					},
				},
				user: {
					connect: {
						id: user?.id,
					},
				},
			},
		});
		if (chat) {
			await client.record.create({
				data: {
					product: {
						connect: {
							id: productId,
						},
					},
					user: {
						connect: {
							id: user?.id,
						},
					},
					kind: "Purchase",
				},
			});
		}
		res.json({
			ok: true,
			chat,
		});
	}
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
