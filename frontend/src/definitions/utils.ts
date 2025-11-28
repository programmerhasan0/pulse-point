import { User } from '@definitions/user';

export type DateIndexCorrectorBlueprint = (
    fullYear: number,
    month: number,
    date: number
) => Date;

export type GenderMapBlueprint = (gender: 'm' | 'f' | 't') => string;

export type Speciality = {
    _id: string;
    title: string;
    slug: string;
    department: string;
    isActive: boolean;
};

// defining an appointment -->

type AppointmentUser = {
    _id: User['_id'];
    email: User['email'];
    phone: User['phone'];
    name: User['name'];
    age: User['age'];
    gender: User['gender'];
};

interface noteUser extends AppointmentUser {
    role: string;
}

export type note = {
    user: noteUser;
    note: string;
    _id: string;
};

export interface DoctorAppointment {
    _id: string;
    user: AppointmentUser;
    doctor: string;
    date: string;
    time: string;
    isPaid: boolean;
    status: 'booked' | 'completed' | 'rescheduled' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    notes: note[];
}

export interface PatientAppointment {
    _id: string;
    doctor: {
        _id: string;
        email: string;
        name: string;
        age: number;
        gender: 'm' | 'f' | 't';
        role: string;
        image: string;
        speciality: Speciality;
        experience: number;
        qualification: string;
        fees: number;
        isConsulting: boolean;
    };
    date: string;
    time: string;
    isPaid: boolean;
    status: 'booked' | 'completed' | 'rescheduled' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}
