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
				user: {
					id: user?.id,
				},
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
					},
				},
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
