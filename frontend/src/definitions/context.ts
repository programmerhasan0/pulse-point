import { Doctor, Speciality } from '@definitions/assets';

export interface AppContextValue {
    doctors: Doctor[];
    specialityData: Speciality[];
    currencySymbol: string;
}
