import db from '../utils/db.util.js';

const userSchema = new db.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: String,
    name: String,
    age: Number,
    gender: {
        type: String,
        enum: ['m', 'f', 't'],
        required: true,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin', 'staff'],
        required: true,
    },
    appointments: [],
});

const User = db.model('User', userSchema);

export default User;
