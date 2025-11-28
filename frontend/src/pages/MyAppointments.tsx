import Appointment from '@components/Appointment';
import { AppContext } from '@context/contexts';
import { PatientAppointment } from '@definitions/utils';
import axios from 'axios';
import { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const MyAppointments: React.FC = () => {
    const { token } = useContext(AppContext);
    const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

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

    const filteredAppointments = useMemo(() => {
        if (!appointments) return [];

        return appointments.filter((appointment) => {
            const q = searchQuery.toLowerCase();
            return (
                appointment.doctor.name.toLowerCase().includes(q) ||
                appointment.doctor.qualification.toLowerCase().includes(q) ||
                appointment.doctor.speciality.title.toLowerCase().includes(q) ||
                appointment.doctor.speciality.department
                    .toLowerCase()
                    .includes(q) ||
                new Date(appointment.date).toLocaleDateString().includes(q)
            );
        });
    }, [appointments, searchQuery]);

    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700">
                My Appointments
            </p>
            <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-sm my-2 outline-none focus:border-primary transition-all duration-200"
                placeholder="Search Appointments by doctor name, speciality, department or date"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
                {filteredAppointments.map((item, idx) => (
                    <Appointment item={item} key={idx} />
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
