import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
	username: string;
	email: string;
	password: string;
	errors: string;
}

export default function Forms() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
	} = useForm<LoginForm>({
		mode: "onChange",
	});
	const onValid = (data: LoginForm) => {
		console.log("I'm valid baby");
		setError("username", { message: "username is already existed" });
	};
	const onInvalid = (errors: FieldErrors) => {
		console.log(errors);
	};

	return (
		<form onSubmit={handleSubmit(onValid, onInvalid)}>
			<input
				{...register("username", {
					required: "Username is required.",
					minLength: {
						message: "The username should be longer than 5 chars.",
						value: 5,
					},
				})}
				type="text"
				placeholder="Username"
			/>
			{errors.username?.message}
			<input
				{...register("email", {
					required: "Email is required.",
					validate: {
						notGmail: (value) =>
							!value.includes("@gmail.com") ||
							"Gmail is not allowed",
					},
				})}
				type="email"
				placeholder="Email"
				className={`${
					Boolean(errors.email?.message)
						? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
						: ""
				}`}
			/>
			{errors.email?.message}
			<input
				{...register("password", { required: "Password is required." })}
				type="password"
				placeholder="Password"
			/>
			<input type="submit" value="Create Account" />
			{errors.errors?.message}
		</form>
	);
}
