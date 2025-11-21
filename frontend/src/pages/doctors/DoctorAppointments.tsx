import DoctorAppointment from '@components/DoctorAppointment';
import { AppContext } from '@context/contexts';
import { DoctorAppointment as DoctorAppointmentType } from '@definitions/utils';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DoctorAppointments: React.FC = () => {
    const { token } = useContext(AppContext);
    const [appointments, setAppointments] = useState<DoctorAppointmentType[]>(
        []
    );

    useEffect(() => {
        axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/appointment/doctor/view`,
                { headers: { Authorization: token } }
            )
            .then((res) => {
                setAppointments(res.data.data);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }, []);

    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">
                Booked Appointments
            </p>
            <div>
                {appointments.map((appointment, idx) => (
                    <DoctorAppointment item={appointment} key={idx} />
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointments;
