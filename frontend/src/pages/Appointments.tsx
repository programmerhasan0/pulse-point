import { useParams } from 'react-router-dom';
import { AppContext } from '@context/contexts';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Doctor } from '@definitions/assets';
import { TimeSlot } from '@definitions/doctor';
import { assets } from '@assets/assets_frontend/assets';
import RelatedDoctors from '@components/RelatedDoctors';
import AppointmentModal from '@components/AppointmentModal';
import axios from 'axios';

const Appointment: React.FC = () => {
    const daysOfWeek: string[] = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
    ];
    const { currencySymbol } = useContext(AppContext);
    const { docId } = useParams<{ docId: string }>();
    const [docInfo, setDocInfo] = useState<Doctor | null>(null);
    const [docSlots, setDocSlots] = useState<TimeSlot[][]>([]);
    const [slotIndex, setSlotIndex] = useState<number>(0);
    const [slotTime, setSlotTime] = useState<string>('');
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] =
        useState<boolean>(false);

    // fetching doctor info
    const fetchDocInfo = useCallback(async () => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/public/doctor/${docId}`)
            .then((res) => {
                setDocInfo(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [docId]);

    const getAvailableSlots = async () => {
        setDocSlots([]);
        // getting current date;
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            // getting date with index
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            // setting end time of the date with index
            const endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            const timeSlots: TimeSlot[] = [];

            while (currentDate < endTime) {
                const formattedTime: string = currentDate.toLocaleTimeString(
                    [],
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                    }
                );
                // add slot to array
                timeSlots.push({
                    dateTime: new Date(currentDate),
                    time: formattedTime,
                }); // increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setDocSlots((prev) => [...prev, timeSlots]);
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [fetchDocInfo]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots]);
    return (
        docInfo && (
            <div>
                {/* -------- Doctor Details -------- */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-primary w-full sm:max-w-72 rounded-lg">
                        <img src={docInfo?.image} alt="" />
                    </div>
                    <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                        {/* -------- Doc Info : name, qualification:, experience -------- */}
                        <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                            {docInfo.name}{' '}
                            <img
                                className="w-5 "
                                src={assets.verified_icon}
                                alt=""
                            />
                        </p>
                        <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                            <p>
                                {docInfo.qualification} -{' '}
                                {docInfo.speciality.title}
                            </p>
                            <button className="py-0.5 px-2 border text-xs rounded-full cursor-pointer">
                                {docInfo.experience} Years
                            </button>
                        </div>
                        {/* -------- Doc About -------- */}
                        <div>
                            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                                About <img src={assets.info_icon} alt="" />
                            </p>
                            <p className="text-sm text-gray-500 max-w-[700px] mt-1 text-justify">
                                Dr. {docInfo.name} has a strong commitment to
                                delivering comprehensive medical care, focusing
                                on preventive medicine, early diagnosis, and
                                effective treatment strategies. Dr.{' '}
                                {docInfo.name} has a strong commitment to
                                delivering comprehensive medical care, focusing
                                on preventive medicine, early diagnosis, and
                                effective treatment strategies.
                            </p>
                        </div>
                        <p className="text-gray-500 font-medium mt-4">
                            Appointment fee:{' '}
                            <span className="text-gray-600">
                                {currencySymbol}
                                {docInfo?.fees}
                            </span>
                        </p>
                    </div>
                </div>
                {/* -------- Booking Slots -------- */}
                <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
                    <p>Booking Slots</p>
                    <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 ">
                        {docSlots.length &&
                            docSlots.map((item, idx) => (
                                <div
                                    onClick={() => setSlotIndex(idx)}
                                    className={`text-center py-6 min-w-16 rounded-full transition-all duration-200 cursor-pointer ${slotIndex === idx ? 'bg-primary text-white' : 'border border-gray-200'}`}
                                    key={idx}
                                >
                                    <p>
                                        {item[0] &&
                                            daysOfWeek[
                                                item[0].dateTime.getDay()
                                            ]}
                                    </p>
                                    <p>
                                        {item[0] && item[0].dateTime.getDate()}
                                    </p>
                                </div>
                            ))}
                    </div>
                    <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                        {docSlots.length &&
                            docSlots[slotIndex].map((item, idx) => (
                                <p
                                    onClick={() => setSlotTime(item.time)}
                                    key={idx}
                                    className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
                                >
                                    {item.time.toLowerCase()}
                                </p>
                            ))}
                    </div>
                    <p className="text-primary mt-4 text-sm font-light">
                        Use Shift+Scroll or touch gestures to scroll the time
                        slots
                    </p>

                    <button
                        className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer"
                        onClick={() => setIsAppointmentModalOpen(true)}
                    >
                        Book an appointment
                    </button>
                </div>
                {/* -------- Listing related doctors -------- */}

                <RelatedDoctors
                    docId={docId}
                    speciality={docInfo.speciality.slug}
                />
                <AppointmentModal
                    isAppointmentModalOpen={isAppointmentModalOpen}
                    setIsAppointmentModalOpen={setIsAppointmentModalOpen}
                    docInfo={docInfo}
                    slotIndex={slotIndex}
                    slotTime={slotTime}
                />
            </div>
        )
    );
};

export default Appointment;
