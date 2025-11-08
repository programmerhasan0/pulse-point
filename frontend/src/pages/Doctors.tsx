import DoctorCard from '@components/DoctorCard';
import { AppContext } from '@context/contexts';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Doctor } from '@definitions/assets';
import slugify from 'slugify';

const Doctors: React.FC = () => {
    const navigate = useNavigate();
    const { specialityParam } = useParams();
    const [filterDoc, setFilterDoc] = useState<Doctor[]>([]);

    const { doctors, specialityData } = useContext(AppContext);

    const applyFilter = () => {
        if (specialityParam) {
            setFilterDoc(
                doctors.filter(
                    (doc) => slugify(doc.speciality) === specialityParam
                )
            );
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, specialityParam]);

    return (
        <div>
            <p className="text-gray-600 ">
                Browse through the doctors specialist
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <div className="flex flex-col gap-4 text-sm text-gray-600">
                    {specialityData.map((speciality) => (
                        <p
                            onClick={() =>
                                navigate(`/doctors/${speciality.url}`)
                            }
                            className={`capitalize w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialityParam === speciality.url ? 'bg-indigo-100 text-black' : ''}`}
                            key={speciality.url}
                        >
                            {speciality.speciality}
                        </p>
                    ))}
                </div>

                <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6">
                    {filterDoc.map((doctor: Doctor, idx: number) => (
                        <DoctorCard key={idx} doctor={doctor} />
                    ))}
                    {filterDoc.length < 1 && (
                        <h1 className="text-red-400 block">
                            Sorry, No Doctors Available
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
