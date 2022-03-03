import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { userInfo } from "os";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		query: { id },
		session: { user },
		body: { answer },
	} = req;

	const newAnswer = await client.answer.create({
		data: {
			user: {
				connect: {
					id: user?.id,
				},
			},
			post: {
				connect: {
					id: +id.toString(),
				},
			},
			answer,
		},
	});
	console.log(newAnswer);
	res.json({
		ok: true,
		answer: newAnswer,
	});
}

export default withApiSession(
	withHandler({
		methods: ["POST"],
		handler,
	})
);
