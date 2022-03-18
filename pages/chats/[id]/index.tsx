import type { NextPage } from "next";
import LayOut from "@components/layout";
import Message from "@components/message";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Chat } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import React, { useEffect } from "react";

interface ChatMessage {
	id: number;
	message: string;
	user: {
		avatar?: string;
		id: number;
	};
}

interface ChatWithMessages extends Chat {
	messages: ChatMessage[];
	user: { id: number };
	product: {
		user: {
			id: number;
		};
	};
}

interface ChatResponse {
	ok: boolean;
	chat: ChatWithMessages;
}

interface MessageForm {
	message: string;
}

const ChatDetail: NextPage = () => {
	const { user, isLoading } = useUser();
	const router = useRouter();
	const { register, handleSubmit, reset } = useForm<MessageForm>();
	const { data, mutate } = useSWR<ChatResponse>(
		router.query.id ? `/api/chats/${router.query.id}` : null,
		{
			refreshInterval: 1000,
		}
	);
	useEffect(() => {
		if (data?.ok === false) {
			router.push("/chats");
		}
	}, [data, router]);
	const [sendMessage, { data: sendMessageData, loading }] = useMutation(
		`/api/chats/${router.query.id}`
	);
	const onValid = (form: MessageForm) => {
		if (loading) return;
		reset();
		mutate(
			(prev) =>
				prev &&
				({
					...prev,
					chat: {
						...prev.chat,
						messages: [
							...prev.chat.messages,
							{
								id: Date.now(),
								message: form.message,
								user: { ...user },
							},
						],
					},
				} as any),
			false
		);
		sendMessage({ form, productId: data?.chat?.productId });
	};

	// scroll to bottom
	const chatBoxRef = React.createRef<HTMLDivElement>();

	useEffect(() => {
		(() => {
			if (chatBoxRef.current) {
				chatBoxRef.current.scrollTop =
					chatBoxRef.current.scrollHeight + 100;
			}
		})();
	}, [data, chatBoxRef]);
	return (
		<LayOut canGoBack seoTitle="Chat">
			<div
				className="py-10 pb-32 h-[100vh] overflow-y-scroll  px-4 space-y-4 scrollbar-hide"
				ref={chatBoxRef}
			>
				{data?.chat?.messages.map((message) => (
					<Message
						key={message.id}
						message={message.message}
						reversed={message.user?.id === user?.id}
						avatar={message.user?.avatar}
					/>
				))}
			</div>
			<div className="fixed py-2 bg-white  bottom-5 inset-x-0">
				<form
					onSubmit={handleSubmit(onValid)}
					className="flex relative max-w-md items-center w-full mx-auto"
				>
					<input
						{...register("message", { required: true })}
						type="text"
						className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
					/>
					<div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
						<button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
							&rarr;
						</button>
					</div>
				</form>
			</div>
		</LayOut>
	);
};

export default ChatDetail;
