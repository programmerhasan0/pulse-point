import React from 'react';
import { Doctor } from '@definitions/assets';
import { useNavigate } from 'react-router-dom';
import { assets } from '@assets/assets_frontend/assets';

type Props = {
    doctor: Doctor;
};

const DoctorCard: React.FC<Props> = ({ doctor }: Props) => {
    const navigate = useNavigate();

    return (
        <div
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
            }}
        >
            <img
                src={doctor.image || assets.profile_pic}
                className="bg-blue-50"
                alt=""
            />
            <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    {doctor.isConsulting && doctor.isActive ? (
                        <>
                            <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                            <p>Available</p>
                        </>
                    ) : (
                        <>
                            <p className="w-2 h-2 bg-gray-500 rounded-full"></p>
                            <p className="text-gray-500">Not Available</p>
                        </>
                    )}
                </div>
                <p className="text-gray-900 text-lg font-medium">
                    {doctor.name}
                </p>
                <p className="text-gray-600 text-sm capitalize">
                    {doctor.speciality.title}
                </p>
            </div>
        </div>
    );
};

export default DoctorCard;
