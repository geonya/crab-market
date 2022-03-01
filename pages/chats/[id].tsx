import type { NextPage } from "next";

import LayOut from "@components/layout";
import Message from "@components/message";

const ChatDetail: NextPage = () => {
	return (
		<LayOut canGoBack>
			<div className="px-4 py-10 space-y-4 pb-16">
				<Message message="Hello How much are you selling them for?" />
				<Message message="I want ￦20,000" reversed />
				<Message message="Are you crazy?" />
				<form className="fixed py-5 bg-white bottom-0 inset-x-0">
					<div className="flex relative max-w-md items-center w-full mx-auto">
						<input
							type="text"
							className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
						/>
						<div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
							<button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
								&rarr;
							</button>
						</div>
					</div>
				</form>
			</div>
		</LayOut>
	);
};

export default ChatDetail;
