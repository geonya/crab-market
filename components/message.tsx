import { cls } from "@libs/client/utils";
import Image from "next/image";

interface MessageProps {
	message: string;
	reversed?: boolean;
	avatar?: string;
}

export default function Message({ message, reversed, avatar }: MessageProps) {
	return (
		<div
			className={cls(
				"flex items-start space-x-2",
				reversed ? "flex-row-reverse space-x-reverse" : ""
			)}
		>
			{avatar ? (
				<Image
					width={40}
					height={40}
					src={`https://imagedelivery.net/MYjqcskotz__nPdJmlB6CQ/${avatar}/avatar`}
					className="w-8 h-8 rounded-full"
					alt="chat-avartar"
				/>
			) : (
				<div className="w-8 h-8 rounded-full bg-slate-400" />
			)}

			<div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
				<p>{message}</p>
			</div>
		</div>
	);
}
