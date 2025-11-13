import { Doctor } from '@definitions/assets';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { AppointmentFormInput } from '@definitions/Forms';
import { useContext } from 'react';
import { AppContext } from '@context/contexts';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

type PropTypes = {
    isAppointmentModalOpen: boolean;
    setIsAppointmentModalOpen: (isOpen: boolean) => void;
    docInfo: Doctor;
    slotIndex: number;
    slotTime: string;
};

const AppointmentModal: React.FC<PropTypes> = ({
    isAppointmentModalOpen,
    setIsAppointmentModalOpen,
    docInfo,
    slotIndex,
    slotTime,
}) => {
    const { currencySymbol } = useContext(AppContext);

    const { handleSubmit, register } = useForm<AppointmentFormInput>();

    const handleAppointmentSubmit = (data: AppointmentFormInput): void => {
        const date = new Date();
        date.setDate(date.getDate() + slotIndex);
        data.appointmentDate = date;
        data.appointmentTime = slotTime;
        console.log(JSON.stringify(data));
    };

    return (
        <Modal isOpen={isAppointmentModalOpen} style={customStyles}>
            <form
                className="max-w-md mx-auto"
                onSubmit={handleSubmit(handleAppointmentSubmit)}
            >
                <input
                    type="hidden"
                    {...register('docId', { value: docInfo._id })}
                />
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="floating_first_name"
                            id="floating_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={docInfo.name}
                            required
                        />
                        <label
                            htmlFor="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Doctor Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="floating_last_name"
                            id="floating_last_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={`${currencySymbol}${docInfo.fees}`}
                            required
                        />
                        <label
                            htmlFor="floating_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Appointment Fee
                        </label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        id="docName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer capitalize"
                        placeholder=""
                        value={docInfo.speciality}
                        required
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Speciality
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        {...register('patientName', { required: true })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                        placeholder=""
                        required
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Patient Name
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        {...register('patientAge', { required: true })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                        placeholder=""
                        required
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Patient Age
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Gender
                    </label>
                    <select
                        {...register('patientGender', { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        <option value="t">Third Gender</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                    Book
                </button>
                <button
                    onClick={() => setIsAppointmentModalOpen(false)}
                    className="text-white bg-amber-500 sm:ml-3 mt-2 sm:mt-auto focus:ring-4 focus:outline-none focus:ring-amber-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer"
                >
                    Close
                </button>
            </form>
        </Modal>
    );
};

export default AppointmentModal;
