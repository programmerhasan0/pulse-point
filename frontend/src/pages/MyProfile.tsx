import { assets } from '@assets/assets_frontend/assets';
import { User } from '@definitions/user';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { genderMap } from '@utils/genderMap';
import { AppContext } from '@context/contexts';

const MyProfile: React.FC = () => {
    const {
        user: { user },
    } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<User>();

    const handleEditFormSubmit = (data: User): void => {
        setIsEdit(false);
        console.log(data);
    };

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
                        <p className="font-medium ">Address: </p>
                        {isEdit ? (
                            <p>
                                <input
                                    type="text"
                                    {...register('address.line1', {
                                        required: true,
                                        value: 'House 4063, Mominpara',
                                    })}
                                    className="bg-gray-50 "
                                />
                                <br />
                                <input
                                    type="text"
                                    {...register('address.line2', {
                                        required: true,
                                        value: 'Tetulia, Panchagarh.',
                                    })}
                                    className="bg-gray-50 "
                                />
                            </p>
                        ) : (
                            <p className="text-gray-500 ">
                                House 4063, Mominpara
                                <br />
                                Tetulia, Panchagarh.
                            </p>
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
                <div className="mt-10">
                    {isEdit ? (
                        <input
                            className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 "
                            type="submit"
                            value="Save information"
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
