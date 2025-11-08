import { AppContext } from '@context/contexts';
import { Doctor } from '@definitions/assets';
import { AppContextValue } from '@definitions/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '@components/DoctorCard';

const TopDoctors: React.FC = () => {
    const navigate = useNavigate();
    const { doctors }: AppContextValue = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
            <p className="sm:w-1/3 text-center text-sm">
                Simply browse through our extensive list of trusted doctors.
            </p>
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {doctors!.slice(0, 10).map((doctor: Doctor, idx: number) => (
                    <DoctorCard key={idx} doctor={doctor} />
                ))}
            </div>
            <button
                onClick={() => {
                    navigate('/doctors');
                    scrollTo(0, 0);
                }}
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer"
            >
                More
            </button>
        </div>
    );
};

export default TopDoctors;
