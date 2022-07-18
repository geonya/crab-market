import { type FieldErrors, useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  email: string;
  password: string;
  errors: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm<LoginForm>({
    mode: 'onChange', // onChange 할 때 event 발생 submit도 있음
  });
  const onValid = (data: LoginForm) => {
    setError('username', { message: 'username is already existed' });
    resetField('password');
  };
  const onInvalid = (errors: FieldErrors) => {
    console.error(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register('username', {
          required: 'Username is required.',
          minLength: {
            message: 'The username should be longer than 5 chars.',
            value: 5,
          },
        })}
        type='text'
        placeholder='Username'
      />
      {errors.username?.message}
      <input
        {...register('email', {
          required: 'Email is required.',
          validate: {
            notGmail: (value) =>
              !value.includes('@gmail.com') || 'Gmail is not allowed',
          },
        })}
        type='email'
        placeholder='Email'
        className={`${
          Boolean(errors.email?.message)
            ? 'border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500'
            : ''
        }`}
      />
      {errors.email?.message}
      <input
        {...register('password', { required: 'Password is required.' })}
        type='password'
        placeholder='Password'
      />
      <input type='submit' value='Create Account' />
      {errors.errors?.message}
    </form>
  );
}
