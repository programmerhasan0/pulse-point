import FormErrorMessage from '@components/FormErrorMessage';
import { AppContext } from '@context/contexts';
import { RegisterLoginFormInput } from '@definitions/Forms';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

axios.defaults.withCredentials = true;

const Login: React.FC = () => {
    const [isRegisterForm, setIsRegisterForm] = useState<boolean>(false);
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<RegisterLoginFormInput>();
    const {
        user: { setUser },
        isLoggedIn: { setIsLoggedIn },
    } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || '/';
    const password = watch('password');

    const onSubmit = (data: RegisterLoginFormInput): void => {
        setIsFormLoading(true);
        if (!isRegisterForm) {
            axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data)
                .then((res) => {
                    localStorage.setItem('token', res.data.data.token);
                    setUser(res.data.data.user);
                    setIsLoggedIn(true);
                    toast.success(res.data.message);
                    navigate(from, { replace: true });
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => {
                    setIsFormLoading(false);
                });
            return;
        }

        if (isRegisterForm) {
            axios
                .post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/create-account`,
                    data
                )
                .then((res) => {
                    setIsRegisterForm(false);
                    toast.success(res.data.message);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => setIsFormLoading(false));
        }
    };

    useEffect(() => {
        reset();
        scrollTo(0, 0);
    }, [isRegisterForm, reset]);

    return (
        <form
            className="min-h-[80vh] flex items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
                className={`flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 ${isRegisterForm && 'md:min-w-2xl'} border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-lg`}
            >
                <p className="text-2xl font-semibold">
                    {isRegisterForm ? 'Create Account' : 'Login'}
                </p>
                <p>
                    {isRegisterForm
                        ? 'Please sign up to book appointment'
                        : 'Please login to book appointment'}
                </p>
                {isRegisterForm && (
                    <>
                        <div className="w-full">
                            <p>Full Name</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1"
                                type="text"
                                {...register('name', {
                                    required: isRegisterForm,
                                })}
                            />
                        </div>
                        <div className="w-full">
                            <p>Age</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1"
                                type="text"
                                {...register('age', {
                                    required: isRegisterForm,
                                })}
                            />
                        </div>
                        <div className="w-full">
                            <p>Gender</p>
                            <select
                                {...register('gender', {
                                    required: true,
                                })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="t">Third Gender</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <p>Phone</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1"
                                type="text"
                                {...register('phone', { required: true })}
                            />
                        </div>
                    </>
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
                        {...register(
                            'password',
                            isRegisterForm
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
                {isRegisterForm && (
                    <div className="w-full">
                        <p>Confirm Password</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
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
                <FormErrorMessage name="name" errors={errors} />
                <FormErrorMessage name="age" errors={errors} />
                <FormErrorMessage name="gender" errors={errors} />
                <FormErrorMessage name="email" errors={errors} />
                <FormErrorMessage name="password" errors={errors} />
                <FormErrorMessage name="confirmPassword" errors={errors} />

                <button
                    className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer disabled:cursor-not-allowed"
                    disabled={isFormLoading}
                    type="submit"
                >
                    {isFormLoading ? (
                        <ClipLoader color="#ffffff" size={10} />
                    ) : isRegisterForm ? (
                        'Create Account'
                    ) : (
                        'Login'
                    )}
                </button>
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
