import db from '../utils/db.util.js';

const appointmentSchema = new db.Schema(
    {
        user: {
            type: db.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        doctor: {
            type: db.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                validator: async (value) => {
                    // Ensure the referenced user has role = "doctor"
                    const doctor = await db
                        .model('User')
                        .findOne({ _id: value, role: 'doctor' });

                    return !!doctor;
                },
                message: "doctor_id must refer to a user with role 'doctor'.",
            },
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
            required: true,
        },
        status: {
            type: String,
            enum: ['booked', 'completed', 'resheduled', 'cancelled'],
            required: true,
        },
    },
    { timestamps: true }
);

const Appointment = db.model('Appointment', appointmentSchema);

export default Appointment;
