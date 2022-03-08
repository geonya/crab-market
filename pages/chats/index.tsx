import type { NextPage } from "next";
import Link from "next/link";
import LayOut from "@components/layout";
import { Chat, Product, User } from "@prisma/client";
import useSWR from "swr";

interface ChatWithUserAndProduct extends Chat {
	user: User;
	product: Product;
}

interface ChatResponse {
	ok: boolean;
	chats: ChatWithUserAndProduct[];
}

const Chats: NextPage = () => {
	const { data } = useSWR<ChatResponse>(`/api/chats`);
	return (
		<LayOut title="Chats" hasTabBar>
			<div className="py-10 divide-y-[1px]">
				{data?.chats?.map((chat) => (
					<Link href={`/chats/${chat.id}`} key={chat.id}>
						<a className="flex px-4 cursor-pointer py-3 items-center space-x-3">
							<div className="w-12 h-12 rounded-full bg-slate-300" />
							<div>
								<p className="text-gray-700">
									{chat.user.name}
								</p>
								<p className="text-sm  text-gray-500">
									See you tomorrow in the corner at 2pm!
								</p>
							</div>
						</a>
					</Link>
				))}
			</div>
		</LayOut>
	);
};

export default Chats;
