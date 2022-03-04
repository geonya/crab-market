import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import LayOut from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import { Stream } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface CreateForm {
	name: string;
	price: string;
	description: string;
}

interface StreamCreateResponse {
	ok: boolean;
	stream: Stream;
}

const Create: NextPage = () => {
	const { register, handleSubmit } = useForm<CreateForm>();
	const [createStream, { data, loading }] =
		useMutation<StreamCreateResponse>(`/api/streams`);
	const onValid = (form: CreateForm) => {
		if (loading) return;
		createStream(form);
	};
	const router = useRouter();
	useEffect(() => {
		if (data && data.ok) {
			router.push(`/streams/${data.stream.id}`);
		}
	}, [data, router]);
	return (
		<LayOut canGoBack title="Go Live">
			<form
				onSubmit={handleSubmit(onValid)}
				className="space-y-4 py-10 px-4"
			>
				<Input
					register={register("name", { required: true })}
					required
					label="Name"
					name="name"
					type="text"
				/>
				<Input
					register={register("price", {
						required: true,
						valueAsNumber: true,
					})}
					required
					label="Price"
					name="price"
					type="number"
					kind="price"
				/>
				<TextArea
					register={register("description", { required: true })}
					required
					name="description"
					label="Description"
				/>
				<Button loading={loading} text="Go Live" />
			</form>
		</LayOut>
	);
};

export default Create;
