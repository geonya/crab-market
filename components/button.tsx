import { cls } from "@libs/client/utils";

interface ButtonProps {
	large?: boolean;
	loading?: boolean;
	text: string;
	[key: string]: any;
}

export default function Button({
	large = false,
	onClick,
	text,
	loading,
	...rest
}: ButtonProps) {
	return (
		<button
			{...rest}
			className={cls(
				"w-full bg-orange-500 hover:bg-orange-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none",
				large ? "py-3 text-base" : "py-2 text-sm"
			)}
		>
			{loading ? "Loading..." : text}
		</button>
	);
}
