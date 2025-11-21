import { AppContext } from '@context/contexts';
import { Doctor } from '@definitions/assets';
import axios from 'axios';
import { FormEvent, useContext, useState } from 'react';
import Modal, { ModalProps } from 'react-responsive-modal';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface PropTypes extends ModalProps {
    doctor: Doctor;
    dateIndex: number;
    time: string;
}

interface ReqTypes {
    doctor_id: string;
    date: Date;
    time: string;
}

const AppointmentModal: React.FC<PropTypes> = ({
    open,
    onClose,
    doctor,
    dateIndex,
    time,
}) => {
    const {
        user: { user },
        currencySymbol,
        token,
    } = useContext(AppContext);
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

    const date = new Date();
    date.setDate(date.getDate() + dateIndex);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const reqData: ReqTypes = { doctor_id: doctor._id, date, time };
        setIsFormLoading(true);
        axios
            .post(
                `${import.meta.env.VITE_BACKEND_URL}/appointment/create`,
                reqData,
                { headers: { Authorization: token } }
            )
            .then((res) => {
                toast.success(res.data.message);
                onClose();
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            })
            .finally(() => setIsFormLoading(false));
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                onClose();
            }}
        >
            <form className="flex items-center" onSubmit={(e) => onSubmit(e)}>
                <div
                    className={`flex flex-col gap-3 m-auto items-start min-w-[340px] sm:min-w-96 md:min-w-2xl rounded-xl text-zinc-600 text-sm`}
                >
                    <p className="text-2xl font-semibold">
                        Appointment Summery
                    </p>

                    <>
                        <div className="w-full">
                            <p>Full Name</p>
                            <input
                                disabled
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                type="text"
                                defaultValue={user?.name}
                            />
                        </div>
                        <div className="w-full">
                            <p>Age</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                type="text"
                                disabled
                                defaultValue={user?.age}
                            />
                        </div>
                        <div className="w-full">
                            <p>Date</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                type="text"
                                disabled
                                defaultValue={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                            />
                        </div>
                        <div className="w-full">
                            <p>Time</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                type="text"
                                disabled
                                defaultValue={time}
                            />
                        </div>
                        <div className="w-full">
                            <p>Doctor Name</p>
                            <input
                                disabled
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                type="text"
                                defaultValue={`Dr. ${doctor.name}`}
                            />
                        </div>
                        <div className="w-full">
                            <p>Speciality</p>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                disabled
                                defaultValue={doctor.speciality._id}
                            >
                                <option value={doctor.speciality._id}>
                                    {doctor.speciality.title}
                                </option>
                            </select>
                        </div>
                        <div className="w-full">
                            <p>Fees</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                type="text"
                                disabled
                                defaultValue={`${currencySymbol}${doctor.fees}`}
                            />
                        </div>

                        <div className="w-full">
                            <p>Phone</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                type="text"
                                disabled
                                defaultValue={user?.phone}
                            />
                        </div>
                    </>
                    <div className="w-full">
                        <p>Email</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                            type="email"
                            disabled
                            defaultValue={user?.email}
                        />
                    </div>

                    <button
                        className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isFormLoading}
                    >
                        {isFormLoading ? (
                            <ClipLoader size={10} color="#ffffff" />
                        ) : (
                            'Book'
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AppointmentModal;
