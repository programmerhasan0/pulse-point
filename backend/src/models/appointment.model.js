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
            enum: ['booked', 'completed', 'rescheduled', 'cancelled'],
            required: true,
        },
    },
    { timestamps: true }
);

// checking before updating a status in appointment via middleware
appointmentSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const user = this.getOptions().user;

    const appointment = await this.model.findOne(this.getQuery());

    if (appointment.status === 'completed') {
        return next(new Error('completed status cannot be modified'));
    }

    if (
        user.role === 'doctor' &&
        appointment.doctor.toString() === user._id.toString()
    ) {
        return next();
    }

    if (
        (user.role === 'admin' || user.role === 'staff') &&
        update.status !== 'completed'
    ) {
        return next();
    }

    return next(new Error('unauthorized to change status'));
});

const Appointment = db.model('Appointment', appointmentSchema);

export default Appointment;
