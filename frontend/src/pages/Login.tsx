import { RegisterLoginFormInput } from '@definitions/Forms';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

axios.defaults.withCredentials = true;

const Login: React.FC = () => {
    const [isRegisterForm, setIsRegisterForm] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<RegisterLoginFormInput>();

    const onSubmit = (data: RegisterLoginFormInput): void => {
        if (!isRegisterForm) {
            const newData = data;
            delete newData.fullName;
            console.log(newData);
            axios
                .post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                    newData,
                    { withCredentials: true }
                )
                .then((res) => console.log('logging the res', res))
                .catch((err) => console.log('logging the error', err));
        }
    };

    return (
        <form
            className="min-h-[80vh] flex items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">
                    {isRegisterForm ? 'Create Account' : 'Login'}
                </p>
                <p>
                    {isRegisterForm
                        ? 'Please sign up to book appointment'
                        : 'Please login to book appointment'}
                </p>
                {isRegisterForm && (
                    <div className="w-full">
                        <p>Full Name</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                            type="text"
                            {...register('fullName', {
                                required: isRegisterForm,
                            })}
                        />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="email"
                        {...register('email', { required: true })}
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="password"
                        {...register('password', { required: true })}
                    />
                </div>
                <input
                    className="bg-primary text-white w-full py-2 rounded-md text-base"
                    type="submit"
                    value={isRegisterForm ? 'Create Account' : 'Login'}
                />
                {isRegisterForm ? (
                    <p>
                        Already have an account?{' '}
                        <span
                            className="text-primary cursor-pointer underline"
                            onClick={() => setIsRegisterForm(false)}
                        >
                            Login here
                        </span>
                    </p>
                ) : (
                    <p>
                        New to Pulse point?{' '}
                        <span
                            className="text-primary cursor-pointer underline"
                            onClick={() => setIsRegisterForm(true)}
                        >
                            Create Account
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;
