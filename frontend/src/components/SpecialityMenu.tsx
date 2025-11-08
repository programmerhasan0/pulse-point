import { specialityData } from '@assets/assets_frontend/assets';
import { Spciality } from '@definitions/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu: React.FC = () => {
    return (
        <div
            id="speciality"
            className="flex flex-col items-center gap-4 py-16 text-gray-800 "
        >
            <h1 className="text-3xl font-medium">Find by Speciality </h1>
            <p className="sm:w-1/3 text-center text-sm">
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
            </p>
            <div className="flex flex-row flex-wrap sm:justify-center gap-4 pt-5 w-full ">
                {specialityData.map((item: Spciality, idx: number) => (
                    <Link
                        key={idx}
                        to={`/doctors/${item.url}`}
                        className="flex flex-col items-center text-xs cursor-pointer shrink-0 hover:translate-y-[-10px] transition-all duration-500"
                    >
                        <img
                            className="w-16 sm:w-24 mb-2 "
                            src={item.image}
                            alt={item.speciality}
                        />
                        <p className="capitalize">{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
