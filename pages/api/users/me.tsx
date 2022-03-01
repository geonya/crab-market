import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

declare module "iron-session" {
	interface IronSessionData {
		user?: {
			id: number;
		};
	}
}
async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	console.log(req.session.user);
	res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
	cookieName: "crabsession",
	password: "2302384098233247568568904lkadsfjalsdfjoiwejoiwjvwqnvwfepfkwef",
});
