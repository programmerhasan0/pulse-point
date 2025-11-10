import Appointment from '@components/Appointment';
import { AppContext } from '@context/contexts';
import { useContext } from 'react';

const MyAppointments: React.FC = () => {
    const { doctors } = useContext(AppContext);
    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">
                My Appointments
            </p>
            <div>
                {doctors.slice(0, 3).map((item, idx) => (
                    <Appointment item={item} key={idx} />
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
