import { assets } from '@assets/assets_frontend/assets';
import { User } from '@definitions/user';
import { correctDateIdex } from '@utils/date';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { genderMap } from '@utils/genderMap';

const MyProfile: React.FC = () => {
    const [userData, setUserData] = useState<User>({
        name: 'Edward Vincent',
        image: assets.profile_pic,
        email: 'programmerhasan0@gmail.com',
        phone: '+8801728-548-385',
        address: {
            line1: 'House 4063, Mominpara',
            line2: 'Tetulia, Panchagarh.',
        },
        gender: 'm',
        dob: correctDateIdex(2004, 12, 30),
    });
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<User>();

    const handleEditFormSubmit = (data: User): void => {
        setUserData((prev) => ({
            ...prev,
            ...data,
            dob: typeof data.dob === 'string' ? new Date(data.dob) : data.dob,
        }));
        setIsEdit(false);
    };

    return (
        <form
            onSubmit={handleSubmit(handleEditFormSubmit)}
            className="max-w-lg flex flex-col gap-2 text-sm "
        >
            <div>
                <img className="w-36 rounded " src={userData.image} alt="" />
                {isEdit ? (
                    <input
                        type="text"
                        {...register('name', {
                            required: true,
                            value: userData.name,
                        })}
                        className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
                    />
                ) : (
                    <p className="font-medium text-3xl text-neutral-800 mt-4">
                        {userData.name}
                    </p>
                )}
                <hr className="bg-zinc-400 h-[1px] border-none" />
                <div>
                    <p className="text-neutral-500 underline mt-3">
                        CONTACT INFORMATION
                    </p>
                    <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                        <p>Email Id: </p>
                        <p className="text-primary">{userData.email}</p>
                        <p className="font-medium">Phone: </p>
                        {isEdit ? (
                            <input
                                type="text"
                                {...register('phone', {
                                    required: true,
                                    value: userData.phone,
                                })}
                                className="bg-gray-50 max-w-52"
                            />
                        ) : (
                            <p className="text-primary">{userData.phone}</p>
                        )}
                        <p className="font-medium ">Address: </p>
                        {isEdit ? (
                            <p>
                                <input
                                    type="text"
                                    {...register('address.line1', {
                                        required: true,
                                        value: userData.address.line1,
                                    })}
                                    className="bg-gray-50 "
                                />
                                <br />
                                <input
                                    type="text"
                                    {...register('address.line2', {
                                        required: true,
                                        value: userData.address.line2,
                                    })}
                                    className="bg-gray-50 "
                                />
                            </p>
                        ) : (
                            <p className="text-gray-500 ">
                                {userData.address.line1}
                                <br />
                                {userData.address.line2}
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
                                    value: userData.gender,
                                })}
                            >
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="t">Third Gender</option>
                            </select>
                        ) : (
                            <p className="text-gray-400">
                                {genderMap(userData.gender)}
                            </p>
                        )}
                        <p className="font-medium">Birthday:</p>
                        {isEdit ? (
                            <input
                                type="date"
                                {...register('dob', {
                                    required: true,
                                })}
                                className="max-w-28 bg-gray-100 "
                                defaultValue={`${userData.dob.getFullYear()}-${userData.dob.getMonth() + 1}-${userData.dob.getDate()}`}
                            />
                        ) : (
                            <p className="text-gray-400">
                                {userData.dob.toLocaleDateString('en-GB')}
                            </p>
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
