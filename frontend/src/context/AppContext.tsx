import { doctors, specialityData } from '@assets/assets_frontend/assets';
import { AppContext } from '@context/contexts';
import { AppContextValue } from '@definitions/context';
import { User } from '@definitions/user';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

const AppContextProvider: React.FC<Props> = ({ children }) => {
    const currencySymbol: string = '$';
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

    const value: AppContextValue = {
        doctors,
        specialityData,
        currencySymbol,
        user: { user, setUser },
        isLoggedIn: { isLoggedIn, setIsLoggedIn },
        isAuthLoading: { isAuthLoading, setIsAuthLoading },
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

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
    }, []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
