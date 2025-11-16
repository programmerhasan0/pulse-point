export type User = {
    _id?: string;
    name?: string; //
    image?: string;
    email?: string; //
    phone?: string; //
    address?: {
        line1: string;
        line2?: string;
    };
    gender?: 'm' | 'f' | 't'; //
    dob?: Date;
    age?: number; //
    role?: string;
};
