import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { phone, email } = req.body;
	const user = phone ? { phone: +phone } : { email };
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
	console.log(token);
	// if (email) {
	// 	user = await client.user.findUnique({
	// 		where: {
	// 			email,
	// 		},
	// 	});
	// 	if (user) console.log("found it!");
	// 	if (!user) {
	// 		console.log("Did not find. will create");
	// 		user = await client.user.create({
	// 			data: {
	// 				name: "Anonymous",
	// 				email,
	// 			},
	// 		});
	// 	}
	// 	console.log(user);
	// }
	// if (phone) {
	// 	user = await client.user.findUnique({
	// 		where: {
	// 			phone: +phone,
	// 		},
	// 	});
	// 	if (user) console.log("found it!");
	// 	if (!user) {
	// 		console.log("Did not find. will create");
	// 		user = await client.user.create({
	// 			data: {
	// 				name: "Anonymous",
	// 				phone: +phone,
	// 			},
	// 		});
	// 	}
	// 	console.log(user);
	// }
	return res.status(200).end();
}

export default withHandler("POST", handler);
