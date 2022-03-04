import type { NextPage } from "next";
import Button from "@components/button";
import LayOut from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
	question: string;
}

interface WriteResponse {
	ok: boolean;
	post: Post;
}

const Write: NextPage = () => {
	const { latitude, longitude } = useCoords();
	const router = useRouter();
	const { register, handleSubmit } = useForm<WriteForm>();
	const [post, { loading, data }] = useMutation<WriteResponse>(`/api/posts`);
	const onValid = (data: WriteForm) => {
		if (loading) return;
		post({ ...data, latitude, longitude });
	};
	useEffect(() => {
		if (data && data.ok) {
			router.push(`/community/${data.post.id}`);
		}
	}, [data, router]);
	return (
		<LayOut canGoBack title="Write Post">
			<form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
				<TextArea
					register={register("question", {
						required: true,
						minLength: 5,
					})}
					required
					placeholder="Ask a question!"
				/>
				<Button loading={loading} text={"Submit"} />
			</form>
		</LayOut>
	);
};

export default Write;
