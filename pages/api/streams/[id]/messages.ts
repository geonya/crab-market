import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import streams from "..";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		query: { id },
		body,
		session: { user },
	} = req;

	const message = await client.message.create({
		data: {
			message: body.message,
			stream: {
				connect: {
					id: +id.toString(),
				},
			},
			user: {
				connect: {
					id: user?.id,
				},
			},
		},
	});
	res.json({ ok: true, message });
}

export default withApiSession(
	withHandler({
		methods: ["POST"],
		handler,
	})
);
