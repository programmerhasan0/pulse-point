import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@context/contexts';
import { Doctor } from '@definitions/assets';
import DoctorCard from '@components/DoctorCard';

type PropTypes = {
    docId?: string;
    speciality?: string;
};

const RelatedDoctors: React.FC<PropTypes> = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState<Doctor[]>([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter(
                (doc) => doc.speciality.slug === speciality && doc._id !== docId
            );
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Releted Doctors</h1>
            <p className="sm:w-1/3 text-center text-sm">
                Meet our best {speciality} doctors.
            </p>
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {relDoc!.slice(0, 5).map((doctor: Doctor, idx: number) => (
                    <DoctorCard key={idx} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default RelatedDoctors;
