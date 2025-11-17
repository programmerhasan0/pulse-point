import { Doctor, Speciality } from '@definitions/assets';
import { User } from '@definitions/user';
import { Dispatch, SetStateAction } from 'react';

export interface AppContextValue {
    doctors: Doctor[];
    specialityData: Speciality[];
    currencySymbol: string;
    // user: [User | null, Dispatch<SetStateAction<User | null>>];
    user: {
        user: User | null;
        setUser: Dispatch<SetStateAction<User | null>>;
    };
    // isLoggedIn: [boolean, Dispatch<SetStateAction<boolean>>];
    isLoggedIn: {
        isLoggedIn: boolean;
        setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    };
    isAuthLoading: {
        isAuthLoading: boolean;
        setIsAuthLoading: Dispatch<SetStateAction<boolean>>;
    };
    token: string | null;
}
