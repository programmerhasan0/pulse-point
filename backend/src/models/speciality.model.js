import db from '../utils/db.util.js';

const specialitySchema = new db.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
});

const Speciality = db.model('Speciality', specialitySchema);

export default Speciality;
