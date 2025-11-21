import { assets } from '@assets/assets_frontend/assets';

import { DoctorAppointment as DoctorAppointmentType } from '@definitions/utils';
import { genderMap } from '@utils/genderMap';
import ChangeAppointmentStatusModal from '@components/ChangeAppointmentStatusModal';
import { useState } from 'react';

const DoctorAppointment: React.FC<{ item: DoctorAppointmentType }> = ({
    item,
}) => {
    const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ];
    const [appointmentChangeStatusModal, setAppointmentChangeStatusModal] =
        useState<boolean>(false);
    const [selectedAppointment, setSelectedAppointment] =
        useState<DoctorAppointmentType>(item);

    const date = new Date(selectedAppointment.date);
    return (
        <div>
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
                <div>
                    <img
                        className="w-32 bg-indigo-50"
                        src={assets.profile_pic}
                        alt=""
                    />
                </div>
                <div className="flex-1 text-sm text-zinc-600 ">
                    <p className="text-neutral-800 font-semibold ">
                        {' '}
                        Patient name: {selectedAppointment.user.name}
                    </p>
                    <div className="flex gap-2 flex-col md:flex-row">
                        <p>
                            {' '}
                            Payment Status :{' '}
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${selectedAppointment.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                            >
                                {selectedAppointment.isPaid
                                    ? 'Paid'
                                    : 'Not Paid'}
                            </span>
                        </p>
                        <p>
                            Appointment Status: {''}
                            <span
                                className={`capitalize  px-2 py-1 rounded-2xl ${selectedAppointment.status === 'rescheduled' && 'bg-yellow-100 text-amber-600'} ${selectedAppointment.status === 'booked' && 'bg-blue-100 text-blue-600'} ${selectedAppointment.status === 'completed' && 'bg-green-100 text-green-600'} ${selectedAppointment.status === 'cancelled' && 'bg-red-100 text-red-600'}`}
                            >
                                {selectedAppointment.status}
                            </span>
                        </p>
                    </div>
                    <p className="text-zinc-700 font-medium mt-1">
                        Patient Info:{' '}
                    </p>
                    <p className="text-xs">
                        Gender :{' '}
                        <span>
                            {genderMap(selectedAppointment.user.gender!)}
                        </span>
                    </p>
                    <p className="text-xs">
                        Age: {selectedAppointment.user.age} Yrs
                    </p>
                    <p className="text-xs mt-1 ">
                        <span className="text-sm text-neutral-700 font-medium">
                            Date & Time:
                        </span>{' '}
                        {`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} | ${selectedAppointment.time}`}
                    </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:text-white hover:bg-primary transition-all duration-200">
                        View Notes
                    </button>
                    <button
                        onClick={() => setAppointmentChangeStatusModal(true)}
                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:text-white hover:bg-primary transition-all duration-200"
                    >
                        Change Status
                    </button>
                </div>
            </div>
            <ChangeAppointmentStatusModal
                open={appointmentChangeStatusModal}
                onClose={() => setAppointmentChangeStatusModal(false)}
                appointment_id={selectedAppointment._id}
                setSelectedAppointment={setSelectedAppointment}
            />
        </div>
    );
};

export default DoctorAppointment;
