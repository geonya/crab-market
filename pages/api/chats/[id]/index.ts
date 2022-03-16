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
			query: { id },
			session: { user },
		} = req;
		const chat = await client.chat.findFirst({
			where: {
				OR: [
					{
						id: +id.toString(),
						user: {
							id: user?.id,
						},
					},
					{
						id: +id.toString(),
						product: {
							user: {
								id: user?.id,
							},
						},
					},
				],
			},
			include: {
				messages: {
					select: {
						id: true,
						message: true,
						user: {
							select: {
								id: true,
								name: true,
								avatar: true,
							},
						},
					},
				},
			},
		});
		if (!chat)
			res.json({
				ok: false,
			});
		return res.json({
			ok: true,
			chat,
		});
	}
	if (req.method === "POST") {
		const {
			body,
			query: { id },
			session: { user },
		} = req;

		const message = await client.message.create({
			data: {
				message: body.form.message,
				chat: {
					connect: {
						id: +id.toString(),
					},
				},
				product: {
					connect: {
						id: +body.productId.toString(),
					},
				},
				user: {
					connect: {
						id: Number(user?.id),
					},
				},
			},
		});
		res.json({ ok: true, message });
	}
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
