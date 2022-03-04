import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	res.json({
		ok: true,
		url: "",
	});
}

export default withApiSession(
	withHandler({
		methods: ["POST"],
		handler,
	})
);
