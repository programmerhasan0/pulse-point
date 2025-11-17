import { assets } from '@assets/assets_frontend/assets';
import { User } from '@definitions/user';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { genderMap } from '@utils/genderMap';
import { AppContext } from '@context/contexts';
import FormErrorMessage from '@components/FormErrorMessage';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile: React.FC = () => {
    const {
        user: { user, setUser },
        token,
    } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<User>();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const handleEditFormSubmit = (data: User): void => {
        setIsFormLoading(true);
        if (password && confirmPassword && password === confirmPassword) {
            data.isChangingPassword = true;
        }

        axios
            .put(
                `${import.meta.env.VITE_BACKEND_URL}/auth/update-profile`,
                data,
                { headers: { Authorization: token } }
            )
            .then((res) => {
                toast.success(res.data.message);
                setUser(res.data.data);
                setIsEdit(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            })
            .finally(() => {
                setIsFormLoading(false);
            });

        console.log(data);
    };

    const passwordRequired = !!password || !!confirmPassword;

    return (
        <form
            onSubmit={handleSubmit(handleEditFormSubmit)}
            className="max-w-lg flex flex-col gap-2 text-sm "
        >
            <div>
                <img
                    className="w-36 rounded "
                    src={assets.profile_pic}
                    alt=""
                />
                {isEdit ? (
                    <input
                        type="text"
                        {...register('name', {
                            required: true,
                            value: user?.name,
                        })}
                        className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
                    />
                ) : (
                    <p className="font-medium text-3xl text-neutral-800 mt-4">
                        {user?.name}
                    </p>
                )}
                <hr className="bg-zinc-400 h-[1px] border-none" />
                <div>
                    <p className="text-neutral-500 underline mt-3">
                        CONTACT INFORMATION
                    </p>
                    <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                        <p>Email Id: </p>
                        <p className="text-primary">{user?.email}</p>
                        <p className="font-medium">Phone: </p>
                        {isEdit ? (
                            <input
                                type="text"
                                {...register('phone', {
                                    required: true,
                                    value: user?.phone,
                                })}
                                className="bg-gray-50 max-w-52"
                            />
                        ) : (
                            <p className="text-primary">{user?.phone}</p>
                        )}
                    </div>
                </div>
                <div>
                    <p className="text-neutral-500 underline mt-3">
                        BASIC INFORMATION
                    </p>
                    <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                        <p className="font-medium">Gender:</p>
                        {isEdit ? (
                            <select
                                className="max-w-20 bg-gray-100"
                                {...register('gender', {
                                    required: true,
                                    value: user?.gender,
                                })}
                            >
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="t">Third Gender</option>
                            </select>
                        ) : (
                            <p className="text-gray-400">
                                {genderMap(user?.gender || 'm')}
                            </p>
                        )}
                        <p className="font-medium">Age: </p>
                        {isEdit ? (
                            <input
                                type="number"
                                {...register('age', {
                                    required: true,
                                    value: user?.age,
                                })}
                                className="max-w-28 bg-gray-100 "
                            />
                        ) : (
                            <p className="text-gray-400">{user?.age} Yrs</p>
                        )}
                    </div>
                </div>
                {isEdit && (
                    <div>
                        <p className="text-neutral-500 underline mt-3">
                            CHANGE PASSWORD
                        </p>
                        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                            <p className="font-medium">Password:</p>
                            <input
                                type="password"
                                {...register('password', {
                                    required: passwordRequired,
                                    pattern: passwordRequired
                                        ? {
                                              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
                                              message:
                                                  'Password must have at least 1 uppercase, 1 lowercase, 1 special char & minimum 6 characters.',
                                          }
                                        : undefined,
                                })}
                                className="max-w-28 bg-gray-100 "
                            />
                            <p className="font-medium">Confirm Password: </p>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: passwordRequired,
                                    validate: passwordRequired
                                        ? (value) =>
                                              value === password ||
                                              'Passwords do not match.'
                                        : undefined,
                                })}
                                className="max-w-28 bg-gray-100 "
                            />
                        </div>
                    </div>
                )}
                <FormErrorMessage name="password" errors={errors} />
                <FormErrorMessage name="confirmPassword" errors={errors} />
                <div className="mt-10">
                    {isEdit ? (
                        <input
                            className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 disabled:cursor-not-allowed"
                            disabled={isFormLoading}
                            type="submit"
                            value="Save Information"
                        />
                    ) : (
                        <button
                            className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 "
                            onClick={() => setIsEdit(true)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default MyProfile;
