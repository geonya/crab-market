import type { NextPage } from "next";
import LayOut from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";

interface StreamMessage {
	id: number;
	message: string;
	user: {
		avatar?: string;
		id: number;
	};
}

interface StreamWithMessages extends Stream {
	messages: StreamMessage[];
}

interface StreamResponse {
	ok: true;
	stream: StreamWithMessages;
}

interface MessageForm {
	message: string;
}

const StreamDetail: NextPage = () => {
	const { user } = useUser();
	const router = useRouter();
	const { register, handleSubmit, reset } = useForm<MessageForm>();
	const { data, mutate } = useSWR<StreamResponse>(
		router.query.id ? `/api/streams/${router.query.id}` : null,
		{
			refreshInterval: 1000,
		}
	);
	const [sendMessage, { data: sendMessageData, loading }] = useMutation(
		`/api/streams/${router.query.id}/messages`
	);
	const onValid = (form: MessageForm) => {
		if (loading) return;
		reset();
		mutate(
			(prev) =>
				prev &&
				({
					...prev,
					stream: {
						...prev.stream,
						messages: [
							...prev.stream.messages,
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
		sendMessage(form);
	};

	return (
		<LayOut canGoBack seoTitle="Live">
			<div className="py-10 px-4 space-y-4">
				{data?.stream.cloudflardId ? (
					<iframe
						className="w-full aspect-video rounded-md shadow-sm"
						src={`https://iframe.videodelivery.net/${data?.stream.cloudflardId}`}
						allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
						allowFullScreen={true}
					></iframe>
				) : null}
				<div className="mt-5">
					<h1 className="text-3xl font-bold text-gray-900">
						{data?.stream?.name}
					</h1>
					<span className="text-2xl block mt-3 text-gray-900">
						{data?.stream?.price}
					</span>
					<p className=" my-6 text-gray-700 break-words">
						{data?.stream?.description}
					</p>
					<div className="bg-orange-300 p-5 rounded-md overflow-scroll flex flex-col space-y-3">
						<span>Stream Kyes (secret)</span>
						<span className="text-gray-500">
							<span className="font-medium text-gray-800">
								URL
							</span>
							:{data?.stream.cloudflareUrl}
						</span>
						<span className="text-gray-500">
							<span className="font-medium text-gray-800">
								Key
							</span>
							:{data?.stream.cloudflareKey}
						</span>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Live Chat
					</h2>
					<div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
						{data?.stream.messages.map((message) => (
							<Message
								key={message.id}
								message={message.message}
								reversed={message.user.id === user?.id}
								avatar={message.user.avatar}
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
				</div>
			</div>
		</LayOut>
	);
};

export default StreamDetail;
