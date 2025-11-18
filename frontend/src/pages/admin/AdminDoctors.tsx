import { assets } from '@assets/assets_frontend/assets';
import DoctorModal from '@components/DoctorModal';
import { AppContext } from '@context/contexts';
import { Doctor } from '@definitions/assets';
import axios from 'axios';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDoctors: React.FC = () => {
    const {
        user: { user },
        token,
        currencySymbol,
    } = useContext(AppContext);
    const [doctors, setDoctors] = useState<Doctor[]>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();

    // searching a specific doctor
    const filteredDoctors = useMemo(() => {
        if (!doctors) return [];

        return doctors.filter((doctor) => {
            const q = searchQuery.toLowerCase();

            return (
                doctor.name.toLowerCase().includes(q) ||
                doctor.qualification.toLowerCase().includes(q) ||
                doctor.speciality?.title?.toLowerCase().includes(q) ||
                doctor.speciality?.department?.toLowerCase().includes(q)
            );
        });
    }, [searchQuery, doctors]);

    const fetchAllDoctors = useCallback(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/admin/doctor/get-all`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                setDoctors(res.data.data);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }, [token]);

    useEffect(() => {
        fetchAllDoctors();
    }, [fetchAllDoctors]);

    if (user?.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-neutral-800">
                        Doctors
                    </h2>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary cursor-pointer text-white text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={() => {
                            setIsEdit(false);
                            setIsModalOpen(true);
                        }}
                    >
                        + New
                    </button>
                </div>
                <input
                    type="text"
                    className="w-full py-3 px-2 border border-gray-300 mb-4 rounded-sm focus:border-primary focus:outline-none"
                    placeholder="Search Doctor"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* Header */}
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    Image
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    Details
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    Fees
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                                    Active
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                                    Consulting
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        {/* Body */}
                        {filteredDoctors?.map((doctor, idx) => (
                            <tbody
                                className="divide-y divide-gray-100"
                                key={idx}
                            >
                                <tr className="hover:bg-gray-50">
                                    {/* Image */}
                                    <td className="px-4 py-3">
                                        <img
                                            src={
                                                doctor.image ||
                                                assets.profile_pic
                                            }
                                            alt="Doctor"
                                            className="w-36 rounded-sm object-cover border border-primary bg-blue-50"
                                        />
                                    </td>

                                    {/* Name + Qualification + Department */}
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-800">
                                            {doctor.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {doctor.qualification}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {`${doctor.speciality.title} - ${doctor.speciality.department} OPD`}
                                        </p>
                                    </td>

                                    {/* Fees */}
                                    <td className="px-4 py-3 text-gray-700 font-medium">
                                        {doctor?.fees
                                            ? `${currencySymbol}${doctor.fees}`
                                            : 'N/A'}
                                    </td>

                                    {/* Active Badge */}
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${doctor.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                        >
                                            {doctor.isActive ? (
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
                                            {doctor.isActive
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </td>

                                    {/* Consulting Badge */}
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${doctor.isActive && doctor.isConsulting ? ' bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-600'}`}
                                        >
                                            {doctor.isActive &&
                                            doctor.isConsulting
                                                ? 'Consulting'
                                                : 'Not Consulting'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3 text-right">
                                        <div className="inline-flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setIsEdit(true);
                                                    setSelectedDoctor(doctor);
                                                    setIsModalOpen(true);
                                                }}
                                                className="px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                                            >
                                                Edit
                                            </button>
                                            <button className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <DoctorModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isEdit={isEdit}
                selectedDoctor={selectedDoctor}
                fetchAllDoctors={fetchAllDoctors}
            />
        </>
    );
};

export default AdminDoctors;
