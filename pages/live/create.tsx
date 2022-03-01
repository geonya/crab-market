import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import LayOut from "@components/layout";
import TextArea from "@components/textarea";

const Create: NextPage = () => {
	return (
		<LayOut canGoBack title="Go Live">
			<form className="space-y-4 py-10 px-4">
				<Input required label="Name" name="name" type="text" />
				<Input
					required
					label="Price"
					name="price"
					type="number"
					kind="price"
				/>
				<TextArea name="description" label="Description" />
				<Button text="Go Live" />
			</form>
		</LayOut>
	);
};

export default Create;
