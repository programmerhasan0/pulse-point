import Appointment from '@components/Appointment';
import { AppContext } from '@context/contexts';
import { PatientAppointment } from '@definitions/utils';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const MyAppointments: React.FC = () => {
    const { doctors, token } = useContext(AppContext);
    const [appointments, setAppointments] = useState<PatientAppointment[]>([]);

    useEffect(() => {
        axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/appointment/view/get-all`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((res) => {
                setAppointments(res.data.data);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }, [token]);

    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">
                My Appointments
            </p>
            <div>
                {appointments.slice(0, 3).map((item, idx) => (
                    <Appointment item={item} key={idx} />
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
