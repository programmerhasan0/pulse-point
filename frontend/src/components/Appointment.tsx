import { PatientAppointment } from '@definitions/utils';

type PropTypes = {
    item: PatientAppointment;
};

const Appointment: React.FC<PropTypes> = ({ item }) => {
    const appointmentDate = new Date(item.date);

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
            <div>
                <img
                    className="w-32 bg-indigo-50"
                    src={item.doctor.image}
                    alt=""
                />
            </div>
            <div className="flex-1 text-sm text-zinc-600 ">
                <p className="text-neutral-800 font-semibold ">
                    {' '}
                    Dr. {item.doctor.name}
                </p>
                <p>{item.doctor.speciality.title}</p>
                <p className="text-zinc-700 font-medium mt-1">
                    Chamber Address:
                </p>
                <p className="text-xs">House no: 3060, Mominpara</p>
                <p className="text-xs">Tetulia, Panchagarh</p>
                <p className="text-xs mt-1 ">
                    <span className="text-sm text-neutral-700 font-medium">
                        Date & Time:
                    </span>{' '}
                    {appointmentDate.getDate()}-{appointmentDate.getMonth() + 1}
                    -{appointmentDate.getFullYear()} | {item.time}
                </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:text-white hover:bg-primary transition-all duration-200">
                    Pay Online
                </button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:text-white hover:bg-red-500 transition-all duration-200">
                    Cancel Appointment
                </button>
            </div>
        </div>
    );
};

export default Appointment;
