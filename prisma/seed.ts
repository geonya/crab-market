import { PrismaClient } from "@prisma/client";
import { mainModule } from "process";

const client = new PrismaClient();

async function main() {
	[...Array.from(Array(500).keys())].forEach(async (item) => {
		await client.stream.create({
			data: {
				name: String(item),
				description: String(item),
				price: item,
				user: {
					connect: {
						id: 25,
					},
				},
			},
		});
		console.log(`${item}/500`);
	});
}

main()
	.catch((e) => console.log(e))
	.finally(() => client.$disconnect);
