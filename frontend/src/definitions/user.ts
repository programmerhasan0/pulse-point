export type User = {
    _id?: string;
    name?: string; //
    image?: string;
    email?: string; //
    phone?: string; //
    gender?: 'm' | 'f' | 't'; //
    age?: number; //
    role?: string;
    password?: string;
    confirmPassword?: string;
    isChangingPassword?: boolean;
};
