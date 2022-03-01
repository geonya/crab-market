import mail from "@sendgrid/mail";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

mail.setApiKey(process.env.SENDGRID_API_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const { phone, email } = req.body;
	const user = phone ? { phone } : email ? { email } : null;
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
		// const message = await twilioClient.messages.create({
		// 	messagingServiceSid: process.env.TWILIO_MSG_SID,
		// 	to: process.env.MY_PHONE!,
		// 	body: `Your login token is ${payload}`,
		// });
		// console.log(message);
	} else if (email) {
		// const email = await mail.send({
		// 	from: "geony8410@gmail.com",
		// 	to: "geony8410@gmail.com",
		// 	subject: "Your Crab Market Verification Email",
		// 	text: `You token is ${payload}`,
		// 	html: `<strong>You token is ${payload}</strong>`,
		// });
		// console.log(email);
	}
	return res.json({
		ok: true,
	});
}

export default withApiSession(
	withHandler({
		method: "POST",
		handler,
		isPrivate: false,
	})
);
