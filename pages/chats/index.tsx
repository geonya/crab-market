import type { NextPage } from "next";
import Link from "next/link";
import LayOut from "@components/layout";
import { Chat, Message, Product, User } from "@prisma/client";
import useSWR from "swr";
import Image from "next/image";
import useUser from "@libs/client/useUser";

interface ProductWtihUser extends Product {
	user: User;
}

interface ChatWithUserAndProduct extends Chat {
	user: User;
	product: ProductWtihUser;
	messages: Message[];
}

interface ChatResponse {
	ok: boolean;
	chats: ChatWithUserAndProduct[];
}

const Chats: NextPage = () => {
	const { user } = useUser();
	const { data } = useSWR<ChatResponse>(`/api/chats`);
	console.log(data);

	return (
		<LayOut seoTitle="Chats" hasTabBar>
			<div className="py-10 divide-y-[1px]">
				{data?.chats?.map((chat) => (
					<Link href={`/chats/${chat.id}`} key={chat.id}>
						<a className="flex px-4 cursor-pointer py-3 items-center space-x-3">
							{user?.id === chat.userId ? (
								chat.product.user.avatar ? (
									<Image
										width={48}
										height={48}
										src={`https://imagedelivery.net/MYjqcskotz__nPdJmlB6CQ/${chat.product.user.avatar}/avatar`}
										className="w-12 h-12 rounded-full bg-slate-300"
										alt="avatar-image"
									/>
								) : (
									<div className="w-12 h-12 rounded-full bg-slate-300" />
								)
							) : chat.user.avatar ? (
								<Image
									width={48}
									height={48}
									src={`https://imagedelivery.net/MYjqcskotz__nPdJmlB6CQ/${chat.user.avatar}/avatar`}
									className="w-12 h-12 rounded-full bg-slate-300"
									alt="avatar-image"
								/>
							) : (
								<div className="w-12 h-12 rounded-full bg-slate-300" />
							)}
							<div>
								<p className="text-gray-700">
									{user?.id === chat.userId
										? chat.product.user.name
										: chat.user.name}
								</p>
								<p className="text-sm  text-gray-500">
									{
										chat.messages[chat.messages.length - 1]
											?.message
									}
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
