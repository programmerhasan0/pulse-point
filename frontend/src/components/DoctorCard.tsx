import React from 'react';
import { Doctor } from '@definitions/assets';
import { useNavigate } from 'react-router-dom';

type Props = {
    doctor: Doctor;
};

const DoctorCard: React.FC<Props> = ({ doctor }: Props) => {
    const navigate = useNavigate();

    return (
        <div
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            onClick={() => navigate(`/appointment/${doctor._id}`)}
        >
            <img src={doctor.image} className="bg-blue-50" alt="" />
            <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                    {doctor.name}
                </p>
                <p className="text-gray-600 text-sm capitalize">
                    {doctor.speciality}
                </p>
            </div>
        </div>
    );
};

export default DoctorCard;
