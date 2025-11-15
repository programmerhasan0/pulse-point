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
    speciality: {
        type: db.Schema.Types.ObjectId,
        ref: 'Speciality',
        required: function () {
            return this.role === 'doctor';
        },
    },
    experience: {
        type: Number,
        required: function () {
            return this.role === 'doctor';
        },
    },
    qualification: {
        type: String,
        required: function () {
            return this.role === 'doctor';
        },
    },
    fees: {
        type: Number,
        required: function () {
            return this.role === 'doctor';
        },
    },
    token: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    isConsulting: {
        type: Boolean,
        default: true,
        required: function () {
            return this.role === 'doctor';
        },
    },
});

const User = db.model('User', userSchema);

export default User;
