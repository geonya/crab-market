import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		session: { user },
		body: { name, price, description },
	} = req;
	if (req.method === "POST") {
		const {
			result: {
				uid,
				rtmps: { url, streamKey },
			},
		} = await (
			await fetch(
				`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/stream/live_inputs`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
					},
					body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
				}
			)
		).json();

		const stream = await client.stream.create({
			data: {
				cloudflardId: uid,
				cloudflareUrl: url,
				cloudflareKey: streamKey,
				name,
				price,
				description,
				user: {
					connect: {
						id: user?.id,
					},
				},
			},
		});

		res.json({ ok: true, stream });
	} else if (req.method === "GET") {
		const streams = await client.stream.findMany();
		res.json({ ok: true, streams });
	}
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
