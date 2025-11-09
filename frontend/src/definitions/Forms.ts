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
    fullName?: string;
    email: string;
    password: string;
};
