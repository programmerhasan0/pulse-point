import { AppContext } from '@context/contexts';
import { DoctorAppointment as DoctorAppointmentType } from '@definitions/utils';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { ModalProps } from 'react-responsive-modal';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface PropTypes extends ModalProps {
    appointment_id: string;
    setSelectedAppointment: Dispatch<SetStateAction<DoctorAppointmentType>>;
}

const ChangeAppointmentStatusModal: React.FC<PropTypes> = ({
    open,
    onClose,
    appointment_id,
    setSelectedAppointment,
}) => {
    const { token } = useContext(AppContext);
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<{ status: string }>();

    const onSubmit = (data: { status: string }) => {
        setIsFormLoading(true);
        axios
            .put(
                `${import.meta.env.VITE_BACKEND_URL}/appointment/change-status/${appointment_id}`,
                data,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((res) => {
                setSelectedAppointment(res.data.data);
                onClose();
                toast.success(res.data.message);
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
            <form
                className="flex items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    className={`flex flex-col gap-3 m-auto items-start min-w-96 rounded-xl text-zinc-600 text-sm`}
                >
                    <p className="text-2xl font-semibold">
                        Change Appointment Status
                    </p>

                    <div className="w-full">
                        <p className="mb-1">Status</p>
                        <select
                            {...register('status', {
                                required: true,
                            })}
                            defaultValue=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none focus:border-primary"
                        >
                            <option value="">Select One</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <button
                        className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isFormLoading}
                    >
                        {isFormLoading ? (
                            <ClipLoader size={10} color="#ffffff" />
                        ) : (
                            'Update Status'
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ChangeAppointmentStatusModal;
