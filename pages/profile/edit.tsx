import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import LayOut from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import Image from "next/image";

interface EditProfileForm {
	name?: string;
	email?: string;
	phone?: string;
	avatar?: FileList;
	formErrors?: string;
}

interface EditProfileResponse {
	ok: boolean;
	error?: string;
}

const EditProfile: NextPage = () => {
	const { user } = useUser();
	const {
		register,
		setValue,
		handleSubmit,
		setError,
		formState: { errors },
		watch,
	} = useForm<EditProfileForm>();
	useEffect(() => {
		if (user?.name) setValue("name", user.name);
		if (user?.email) setValue("email", user.email);
		if (user?.phone) setValue("phone", user.phone);
		if (user?.avatar)
			setAvatarPreview(
				`https://imagedelivery.net/MYjqcskotz__nPdJmlB6CQ/${user?.avatar}/avatar`
			);
	}, [user, setValue]);
	const [editProfile, { data, loading }] =
		useMutation<EditProfileResponse>(`/api/users/me`);
	const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
		if (loading) return;
		if (email === "" && phone === "" && name === "") {
			setError("formErrors", {
				message: "Email or phone number are required.",
			});
		}
		if (avatar && avatar.length > 0 && user) {
			const { uploadURL } = await (await fetch(`/api/files`)).json();
			const form = new FormData();
			form.append("file", avatar[0], user.id + "");
			const {
				result: { id },
			} = await (
				await fetch(uploadURL, {
					method: "POST",
					body: form,
				})
			).json();

			editProfile({
				email,
				phone,
				name,
				avatarId: id,
			});
		} else {
			editProfile({
				email,
				phone,
				name,
			});
		}
	};
	useEffect(() => {
		if (data && !data.ok && data.error) {
			setError("formErrors", { message: data.error });
		}
	}, [data, setError]);
	const [avatarPreview, setAvatarPreview] = useState("");
	const avatar = watch("avatar");
	useEffect(() => {
		if (avatar && avatar.length > 0) {
			const file = avatar[0];
			setAvatarPreview(URL.createObjectURL(file));
		}
	}, [avatar]);
	return (
		<LayOut canGoBack seoTitle="Edit Profile">
			<form
				onSubmit={handleSubmit(onValid)}
				className="py-10 px-4 space-y-4"
			>
				<div className="flex items-center space-x-3">
					{avatarPreview ? (
						<Image
							width={60}
							height={60}
							src={avatarPreview}
							className="w-16 h-16 bg-slate-400 rounded-full"
							alt="avatar-image"
						/>
					) : (
						<div className="w-14 h-14 rounded-full bg-slate-500" />
					)}
					<label
						htmlFor="picture"
						className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
					>
						Change
						<input
							{...register("avatar")}
							id="picture"
							type="file"
							className="hidden"
							accept="image/*"
						/>
					</label>
				</div>
				<Input
					register={register("name")}
					required={false}
					label="Name"
					name="name"
					type="text"
				/>
				<Input
					register={register("email")}
					required={false}
					label="Email Address"
					name="email"
					type="email"
				/>
				<Input
					register={register("phone")}
					required={false}
					label="Phone Number"
					name="phone"
					type="number"
					kind="phone"
				/>
				{errors.formErrors ? (
					<span className="mx-auto my-2 text-red-500 font-medium text-center block">
						{errors.formErrors.message}
					</span>
				) : null}
				<Button loading={loading} text={"Update Profile"} />
			</form>
		</LayOut>
	);
};

export default EditProfile;
