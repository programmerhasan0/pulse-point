import { AppContext } from '@context/contexts';
import { Speciality } from '@definitions/utils';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { ModalProps } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

interface PropTypes extends ModalProps {
    fetchSpecialities: () => void;
    isEdit: boolean;
    speciality?: Speciality;
}

const CreateSpecialityModal: React.FC<PropTypes> = ({
    open,
    onClose,
    fetchSpecialities,
    isEdit,
    speciality,
}) => {
    const { token } = useContext(AppContext);
    const { register, handleSubmit, reset } = useForm<Speciality>();
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

    const onAddSpecialitySubmit = (data: Speciality) => {
        setIsFormLoading(true);
        if (isEdit) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/admin/speciality/edit`,
                    data,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((res) => {
                    onClose();
                    toast.success(res.data.message);
                    fetchSpecialities();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => {
                    setIsFormLoading(false);
                });
        } else {
            axios
                .post(
                    `${import.meta.env.VITE_BACKEND_URL}/admin/speciality/add`,
                    data,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((res) => {
                    onClose();
                    toast.success(res.data.message);
                    fetchSpecialities();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => {
                    setIsFormLoading(false);
                });
        }
    };

    useEffect(() => {
        if (open) {
            reset(
                isEdit ? speciality : { title: '', department: '', slug: '' }
            );
        }
    }, [open, isEdit, speciality, reset]);

    return (
        <div className="">
            <Modal
                open={open}
                onClose={() => {
                    onClose();
                    reset();
                }}
                closeOnEsc
            >
                <h2>Add Speciality</h2>
                <div className="p-2 min-w-[340px]">
                    <form
                        className="max-w-md mx-auto"
                        onSubmit={handleSubmit(onAddSpecialitySubmit)}
                    >
                        {isEdit && (
                            <input
                                type="hidden"
                                {...(register('_id'),
                                { value: speciality?._id })}
                            />
                        )}
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer capitalize"
                                placeholder=""
                                {...register('title', {
                                    required: true,
                                    value: isEdit ? speciality?.title : '',
                                })}
                            />
                            <label
                                htmlFor=""
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Title
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer capitalize"
                                placeholder=""
                                {...register('department', {
                                    required: true,
                                    value: isEdit ? speciality?.department : '',
                                })}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Department
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                                placeholder=""
                                {...register('slug', {
                                    required: true,
                                    value: isEdit ? speciality?.slug : '',
                                })}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                URL Slug
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                        >
                            {isFormLoading ? (
                                <ClipLoader color="#FFFFFF" size={10} />
                            ) : isEdit ? (
                                'Edit'
                            ) : (
                                'Add'
                            )}
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default CreateSpecialityModal;
