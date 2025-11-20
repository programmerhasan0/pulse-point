import FormErrorMessage from '@components/FormErrorMessage';
import { AppContext } from '@context/contexts';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface FormTypes {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const CreatePassword: React.FC = () => {
    const {
        user: { user },
        token,
    } = useContext(AppContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const createToken = searchParams.get('token');
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const isCreateToken = createToken && createToken.length > 0;

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormTypes>();

    const password = watch('password');

    const onCreatePasswordSubmit = (data: FormTypes) => {
        setIsFormLoading(true);
        const reqData = { token: createToken, ...data };
        axios
            .patch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/doctor-staff/update-password`,
                reqData
            )
            .then((res) => {
                reset();
                navigate('/login');
                toast.success(res.data.message);
            })
            .catch((err) => {
                reset();
                toast.error(err.response.data.message);
            })
            .finally(() => setIsFormLoading(false));
    };

    if (token && user?._id) {
        return <Navigate to="/" />;
    }

    return (
        <form
            className="min-h-[80vh] flex items-center"
            onSubmit={handleSubmit(onCreatePasswordSubmit)}
        >
            <div
                className={`flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] max-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-lg`}
            >
                <p className="text-2xl font-semibold">Create Password</p>
                <p>Hello, please create you new password</p>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none focus:border-primary"
                        type="password"
                        {...register(
                            'password',
                            isCreateToken
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

                <div className="w-full">
                    <p>Confirm Password</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none focus:border-primary"
                        type="password"
                        {...register('confirmPassword', {
                            required: true,
                            validate: (value) =>
                                value === password || 'Passwords do not match.',
                        })}
                    />
                </div>

                <FormErrorMessage errors={errors} name="password" />
                <FormErrorMessage errors={errors} name="confirmPassword" />

                <button
                    className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer disabled:cursor-not-allowed"
                    disabled={isFormLoading}
                    type="submit"
                >
                    {isFormLoading ? (
                        <ClipLoader size={10} color="#ffffff" />
                    ) : (
                        'Create Password'
                    )}
                </button>
            </div>
        </form>
    );
};

export default CreatePassword;
