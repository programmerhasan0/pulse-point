import { Speciality } from '@definitions/utils';

export interface Doctor {
    _id: string;
    email: string;
    phone: string;
    name: string;
    age: number;
    image: string;
    fees: number;
    gender: 'm' | 'f' | 't';
    speciality: Speciality;
    qualification: string;
    isActive: boolean;
    isConsulting: boolean;
    experience: number;
}