import type { NextPage } from "next";
import LayOut from "@components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Answer, Post, User } from "@prisma/client";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";

interface AnswerWithUser extends Answer {
	user: User;
}

interface PostWithUser extends Post {
	user: User;
	_count: {
		answers: number;
		wonderings: number;
	};
	answers: AnswerWithUser[];
}

interface AnswerForm {
	answer: string;
}

interface CommunityPostResponse {
	ok: boolean;
	post: PostWithUser;
	isWondering: boolean;
}

interface AnswerResponse {
	ok: boolean;
	response: AnswerResponse;
}

const CommunityPostDetail: NextPage = () => {
	const router = useRouter();
	const { register, handleSubmit, reset } = useForm<AnswerForm>();
	const { data, mutate } = useSWR<CommunityPostResponse>(
		router.query.id ? `/api/posts/${router.query.id}` : null
	);
	useEffect(() => {
		if (data?.ok && !data?.post) {
			router.back();
		}
	}, [data, router]);
	const [wonder, { loading }] = useMutation(
		`/api/posts/${router.query.id}/wonder`
	);
	const [sendAnswer, { data: answerData, loading: answerLoading }] =
		useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answer`);
	const onWonderClick = () => {
		if (!data) return;
		mutate(
			{
				...data,
				post: {
					...data?.post,
					_count: {
						...data.post._count,
						wonderings: data.isWondering
							? data?.post._count.wonderings - 1
							: data?.post._count.wonderings + 1,
					},
				},
				isWondering: !data.isWondering,
			},
			false
		);
		if (!loading) {
			wonder({});
		}
	};
	const onValid = (form: AnswerForm) => {
		if (answerLoading) return;
		sendAnswer(form);
	};
	useEffect(() => {
		if (answerData && answerData.ok) {
			reset();
			mutate();
		}
	}, [answerData, reset, mutate]);
	return (
		<LayOut hasTabBar canGoBack>
			<div>
				<span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
					동네질문
				</span>

				<div className="mb-3 px-4 flex cursor-pointer py-3 border-b items-center space-x-3">
					<div className="w-10 h-10 rounded-full bg-slate-300" />
					<div>
						<p className="text-sm font-medium text-gray-700">
							{data?.post?.user?.name}
						</p>
						<Link href={`/users/profile/${data?.post?.user?.id}`}>
							<a className="text-xs font-medium text-gray-500">
								View profile &rarr;
							</a>
						</Link>
					</div>
				</div>
				<div>
					<div className="mt-2 px-4 text-gray-700">
						<span className="text-orange-500 font-medium">Q.</span>{" "}
						{data?.post?.question}
					</div>
				</div>
				<div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
					<button
						onClick={onWonderClick}
						className={cls(
							data?.isWondering ? "text-green-500" : "",
							"flex space-x-2 items-center text-sm"
						)}
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span>궁금해요 {data?.post?._count?.wonderings}</span>
					</button>
					<span className="flex space-x-2 items-center text-sm">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							></path>
						</svg>
						<span>답변 {data?.post?._count?.answers}</span>
					</span>
				</div>

				<div className="px-4 my-5 space-y-5">
					{data?.post?.answers.map((answer) => (
						<div
							key={answer.id}
							className="flex items-start space-x-3"
						>
							<div className="w-8 h-8 bg-slate-200 rounded-full" />
							<div>
								<span className="text-sm block font-medium text-gray-700">
									{answer?.user.name}
								</span>
								<span className="text-xs text-gray-500 block ">
									{answer?.createdAt}
								</span>
								<p className="text-gray-700 mt-2">
									{answer?.answer}
								</p>
							</div>
						</div>
					))}
				</div>
				<form onSubmit={handleSubmit(onValid)} className="px-4 ">
					<TextArea
						className="mt-1 shadow-sm w-full focus:ring-2 focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
						rows={4}
						placeholder="Answer this question."
						register={register("answer", {
							required: true,
							minLength: 5,
						})}
					/>
					<button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:right-2 focus:ring-offset-2 focus:ring-orage-500 focus:outline-none">
						{answerLoading ? "Loading..." : "Reply"}
					</button>
				</form>
			</div>
		</LayOut>
	);
};

export default CommunityPostDetail;
