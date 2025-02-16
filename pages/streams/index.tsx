import type { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "@components/floating-button";
import LayOut from "@components/layout";
import { Stream } from "@prisma/client";
import useSWR from "swr";
import Image from "next/image";

interface StreamsResponse {
	ok: boolean;
	streams: Stream[];
}

const Streams: NextPage = () => {
	const { data } = useSWR<StreamsResponse>(`/api/streams`);

	return (
		<LayOut title="Streams" hasTabBar seoTitle="Steaming">
			<div className="py-10 space-y-4 divide-y-2">
				{data?.streams?.map((stream) => (
					<Link href={`/streams/${stream.id}`} key={stream.id}>
						<a className="pt-4 block px-4 ">
							<div className="w-full relative overflow-hidden rounded-md shadow-sm bg-slate-300 aspect-video">
								<Image
									layout="fill"
									src={`https://videodelivery.net/${stream.cloudflardId}/thumbnails/thumbnail.jpg?height=270`}
									alt={stream.cloudflardId}
								/>
							</div>
							<h1 className=" text-gray-700 text-lg">
								{stream.name}
							</h1>
						</a>
					</Link>
				))}
				<FloatingButton href="/streams/create">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
						></path>
					</svg>
				</FloatingButton>
			</div>
		</LayOut>
	);
};

export default Streams;
