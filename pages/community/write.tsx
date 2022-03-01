import type { NextPage } from "next";
import Button from "@components/button";
import LayOut from "@components/layout";
import TextArea from "@components/textarea";

const Write: NextPage = () => {
	return (
		<LayOut canGoBack title="Write Post">
			<form className="px-4 py-10">
				<TextArea required placeholder="Ask a question!" />
				<Button text="Submit" />
			</form>
		</LayOut>
	);
};

export default Write;
