export type AppointmentFormInput = {
    docId: string;
    patientName: string;
    patientAge: string;
    patientEmail: string;
    patientGender: string;
    appointmentDate: Date;
    appointmentTime: string;
};

export type RegisterLoginFormInput = {
    name?: string;
    age?: number;
    gender: 'm' | 'f' | 't';
    email: string;
    password: string;
    confirmPassword?: string;
    phone?: string;
};
