import CreateSpecialityModal from '@components/CreateSpcialityModal';
import { AppContext } from '@context/contexts';
import { Speciality } from '@definitions/utils';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Specialities: React.FC = () => {
    const {
        user: { user },
        token,
    } = useContext(AppContext);

    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedSpeciality, setSelectedSpecility] = useState<Speciality>();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const fetchSpecialities = useCallback(() => {
        axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/admin/speciality/get-all`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((res) => {
                setSpecialities(res.data.data);
            })
            .catch((err) => {
                console.log('error happend', err);
            });
    }, [token]);

    useEffect(() => {
        fetchSpecialities();
    }, [fetchSpecialities]);

    if (user?.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-neutral-800">
                        Specialities
                    </h2>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary cursor-pointer text-white text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={() => {
                            setIsEdit(false);
                            setIsOpenModal(true);
                        }}
                    >
                        + New
                    </button>
                </div>

                <div className="overflow-x-auto bg-white rounded-md shadow-sm">
                    <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                    Department
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                    Active
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-100">
                            {specialities!.map((speciality) => (
                                <tr
                                    key={speciality._id}
                                    className="hover:bg-neutral-50"
                                >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-800">
                                        {speciality.title}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">
                                        {speciality.department}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                        <button
                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                                speciality.isActive
                                                    ? 'bg-green-100 text-green-800 ring-green-200'
                                                    : 'bg-red-100 text-red-800 ring-red-200'
                                            }`}
                                        >
                                            <span className="mr-2 flex-shrink-0">
                                                {speciality.isActive ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-9a1 1 0 102 0v3a1 1 0 11-2 0V9zM9 7a1 1 0 112 0 1 1 0 01-2 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                            {speciality.isActive
                                                ? 'Active'
                                                : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="inline-flex items-center gap-2">
                                            <button
                                                className="px-2 py-1 rounded-md text-sm bg-yellow-50 text-yellow-700 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                                                aria-label={`Edit ${speciality.title}`}
                                                onClick={() => {
                                                    setIsEdit(true);
                                                    setSelectedSpecility(
                                                        speciality
                                                    );
                                                    setIsOpenModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="px-2 py-1 rounded-md text-sm bg-red-50 text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
                                                aria-label={`Delete ${speciality.title}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {specialities.length === 0 && (
                        <div className="p-6 text-center text-sm text-neutral-500">
                            No records found.
                        </div>
                    )}
                </div>
            </div>
            <CreateSpecialityModal
                open={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                fetchSpecialities={fetchSpecialities}
                isEdit={isEdit}
                speciality={selectedSpeciality}
            />
        </div>
    );
};

export default Specialities;
