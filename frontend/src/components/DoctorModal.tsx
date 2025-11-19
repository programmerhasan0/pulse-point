import { AppContext } from '@context/contexts';
import { Doctor } from '@definitions/assets';
import { Speciality } from '@definitions/utils';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { ModalProps } from 'react-responsive-modal';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface PropTypes extends ModalProps {
    isEdit: boolean;
    selectedDoctor?: Doctor;
    fetchAllDoctors?: () => void;
}

interface FormTypes {
    email: string;
    phone: string;
    name: string;
    age: number;
    image: FileList;
    fees: number;
    gender: 'm' | 'f' | 't';
    speciality: Speciality;
    qualification: string;
    isActive: boolean;
    isConsulting: boolean;
    experience: number;
}

const DoctorModal: React.FC<PropTypes> = ({
    open,
    onClose,
    isEdit,
    selectedDoctor,
    fetchAllDoctors,
}) => {
    const { token } = useContext(AppContext);
    const { register, handleSubmit, reset } = useForm<FormTypes>();
    const [specialities, setSpecialities] = useState<Speciality[]>();
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/admin/speciality/get-all`,
                {
                    headers: { Authorization: token },
                }
            )
            .then((res) => {
                const specs = res.data.data;
                const filteredSpecs = specs.filter(
                    (spec: Speciality) => spec.isActive === true
                );
                setSpecialities(filteredSpecs);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }, [token]);

    const onSubmit = (data: FormTypes) => {
        setIsFormLoading(true);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('age', String(data.age));
        formData.append('gender', data.gender);
        formData.append('speciality', (data.speciality as Speciality)._id);
        formData.append('qualification', data.qualification);
        formData.append('experience', String(data.experience));
        formData.append('fees', String(data.fees));
        formData.append('phone', data.phone);
        formData.append('email', data.email);

        if (isEdit) {
            formData.append('_id', String(selectedDoctor?._id));
        }

        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        const addOrEdit = isEdit
            ? axios.put(
                  `${import.meta.env.VITE_BACKEND_URL}/admin/doctor/edit-info`,
                  formData,
                  { headers: { Authorization: token } }
              )
            : axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/admin/doctor/add`,
                  formData,
                  { headers: { Authorization: token } }
              );

        addOrEdit
            .then((res) => {
                fetchAllDoctors!();
                toast.success(res.data.message);
                reset();
                onClose();
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            })
            .finally(() => {
                setIsFormLoading(false);
            });
    };

    useEffect(() => {
        if (isEdit) {
            // todo : reset form while editing
            reset({
                name: selectedDoctor?.name,
                email: selectedDoctor?.email,
                phone: selectedDoctor?.phone,
                age: selectedDoctor?.age,
                gender: selectedDoctor?.gender,
                speciality: selectedDoctor?.speciality,
                qualification: selectedDoctor?.qualification,
                experience: selectedDoctor?.experience,
                fees: selectedDoctor?.fees,
            });
        } else {
            reset();
        }
    }, [reset, isEdit, selectedDoctor]);

    return (
        <Modal
            open={open}
            onClose={() => {
                reset();
                onClose();
            }}
        >
            <form
                className="flex items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    className={`flex flex-col gap-3 m-auto items-start min-w-[340px] sm:min-w-96 md:min-w-2xl rounded-xl text-zinc-600 text-sm`}
                >
                    <p className="text-2xl font-semibold">Add Doctor</p>

                    <>
                        <div className="w-full">
                            <p>Full Name</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                                type="text"
                                {...register('name', {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="w-full">
                            <p>Age</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                                type="text"
                                {...register('age', {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="w-full">
                            <p>Gender</p>
                            <select
                                {...register('gender', {
                                    required: true,
                                })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none focus:border-primary"
                            >
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="t">Third Gender</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <p>Speciality</p>
                            <select
                                {...register('speciality._id', {
                                    required: true,
                                })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none focus:border-primary"
                            >
                                {specialities?.map((speciality, idx) => (
                                    <option value={speciality._id} key={idx}>
                                        {speciality.title} -{' '}
                                        {speciality.department} OPD
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full">
                            <p>Qualification</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                                type="text"
                                {...register('qualification', {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="w-full">
                            <p>
                                Experience{' '}
                                <span className="text-amber-600 font-medium text-xs">
                                    (in years)
                                </span>
                            </p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                                type="number"
                                {...register('experience', {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="w-full">
                            <p>Fees</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                                type="number"
                                {...register('fees', { required: true })}
                            />
                        </div>
                        <div className="w-full">
                            <p>Image</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary hover:cursor-pointer"
                                type="file"
                                placeholder=""
                                accept="image/*"
                                {...register('image')}
                            />
                        </div>
                        <div className="w-full">
                            <p>Phone</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                                type="text"
                                {...register('phone', { required: true })}
                            />
                        </div>
                    </>
                    <div className="w-full">
                        <p>Email</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                            type="email"
                            {...register('email', { required: true })}
                        />
                    </div>

                    <button
                        className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isFormLoading}
                    >
                        {isFormLoading ? (
                            <ClipLoader size={10} color="#ffffff" />
                        ) : isEdit ? (
                            'Edit'
                        ) : (
                            'Add'
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default DoctorModal;
