import { AppContext } from '@context/contexts';
import { Doctor } from '@definitions/assets';
import { AppContextValue } from '@definitions/context';
import { User } from '@definitions/user';
import { Speciality } from '@definitions/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

const AppContextProvider: React.FC<Props> = ({ children }) => {
    const token = localStorage.getItem('token');

    const currencySymbol: string = '$';
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [specialityData, setSpecialityData] = useState<Speciality[]>([]);

    useEffect(() => {
        if (!token) {
            setIsAuthLoading(false);
            return;
        }

        if (token) {
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => {
                    setIsLoggedIn(true);
                    setUser(res.data.data);
                })
                .catch((err) => {
                    console.log('error happend', err);
                })
                .finally(() => {
                    setIsAuthLoading(false);
                });
        }
    }, [token]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/public/doctor/get-all`)
            .then((res) => {
                setDoctors(res.data.data);
            });

        axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/public/specialities/get-all`
            )
            .then((res) => {
                setSpecialityData(res.data.data);
            });
    }, []);

    const value: AppContextValue = {
        doctors,
        specialityData,
        currencySymbol,
        user: { user, setUser },
        isLoggedIn: { isLoggedIn, setIsLoggedIn },
        isAuthLoading: { isAuthLoading, setIsAuthLoading },
        token,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
