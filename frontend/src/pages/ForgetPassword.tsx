import FormErrorMessage from '@components/FormErrorMessage';
import { AppContext } from '@context/contexts';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface FormTypes {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const ForgetPassword: React.FC = () => {
    const {
        user: { user },
        token,
    } = useContext(AppContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const resetToken = searchParams.get('token');
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const isResetToken = resetToken && resetToken.length > 0;

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormTypes>();

    const password = watch('password');
    const onResetSubmit = (data: FormTypes) => {
        setIsFormLoading(true);

        if (isResetToken) {
            const reqData = {
                token: resetToken,
                password: data.password,
                confirmPassword: data.confirmPassword,
            };
            axios
                .post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`,
                    reqData
                )
                .then((res) => {
                    navigate('/login');
                    toast.success(res.data.message);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => {
                    setIsFormLoading(false);
                });
        } else {
            const email = { email: data.email };
            axios
                .post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/get-reset-token`,
                    email
                )
                .then((res) => {
                    reset();
                    toast.success(res.data.message);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => {
                    setIsFormLoading(false);
                });
        }
    };

    if (token && user?._id) {
        return <Navigate to="/" />;
    }

    return (
        <form
            className="min-h-[80vh] flex items-center"
            onSubmit={handleSubmit(onResetSubmit)}
        >
            <div
                className={`flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] max-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-lg`}
            >
                <p className="text-2xl font-semibold">
                    {isResetToken ? 'Password' : 'Email'}
                </p>
                <p>
                    {isResetToken
                        ? 'Please Enter new password'
                        : 'Enter your email to get reset link'}
                </p>
                {!isResetToken && (
                    <div className="w-full">
                        <p>Email</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none focus:border-primary"
                            type="email"
                            {...register('email', { required: true })}
                        />
                    </div>
                )}
                {isResetToken && (
                    <>
                        <div className="w-full">
                            <p>Password</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none focus:border-primary"
                                type="password"
                                {...register(
                                    'password',
                                    isResetToken
                                        ? {
                                              required: true,
                                              pattern: {
                                                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
                                                  message:
                                                      'Password must have at least 1 uppercase, 1 lowercase, 1 special char & minimum 6 characters.',
                                              },
                                          }
                                        : { required: true }
                                )}
                            />
                        </div>
                        {isResetToken && (
                            <div className="w-full">
                                <p>Confirm Password</p>
                                <input
                                    className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none focus:border-primary"
                                    type="password"
                                    {...register('confirmPassword', {
                                        required: true,
                                        validate: (value) =>
                                            value === password ||
                                            'Passwords do not match.',
                                    })}
                                />
                            </div>
                        )}
                        <FormErrorMessage errors={errors} name="password" />
                        <FormErrorMessage
                            errors={errors}
                            name="confirmPassword"
                        />
                    </>
                )}
                <button
                    className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer disabled:cursor-not-allowed"
                    disabled={isFormLoading}
                    type="submit"
                >
                    {isFormLoading ? (
                        <ClipLoader color="#ffffff" size={10} />
                    ) : isResetToken ? (
                        'Reset Password'
                    ) : (
                        'Send Link'
                    )}
                </button>
                <p>
                    Already have an account?{' '}
                    <NavLink
                        to="/login"
                        className="text-primary cursor-pointer underline"
                    >
                        Login here
                    </NavLink>
                </p>
            </div>
        </form>
    );
};

export default ForgetPassword;
