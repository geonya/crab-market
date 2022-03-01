import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const { phone, email } = req.body;
	const user = phone ? { phone: +phone } : email ? { email } : null;
	if (!user) res.status(400).json({ ok: false });
	const payload = Math.floor(100000 + Math.random() * 900000) + "";
	const token = await client.token.create({
		data: {
			payload,
			user: {
				connectOrCreate: {
					where: {
						...user,
					},
					create: {
						name: "Anonimous",
						...user,
					},
				},
			},
		},
	});
	if (phone) {
		const message = await twilioClient.messages.create({
			messagingServiceSid: process.env.TWILIO_MSG_SID,
			to: process.env.MY_PHONE!,
			body: `Your login token is ${payload}`,
		});
		console.log(message);
	}
	return res.json({
		ok: true,
	});
}

export default withHandler("POST", handler);
