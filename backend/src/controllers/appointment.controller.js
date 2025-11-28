import ApiResponse from '../utils/ApiResponse.util.js';

import Appointment from '../models/appointment.model.js';
import { isValidObjectId } from 'mongoose';

export const postCreateAppointment = async (req, res) => {
    if (req.user?.role === 'patient') {
        const { doctor_id, date, time } = req?.body;

        if (!(doctor_id && date && time)) {
            return new ApiResponse(res).badRequest();
        }

        // verifying if appointment date and time already exists.
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const isAlreadyBooked = await Appointment.find({
            doctor: doctor_id,
            date: { $gte: start, $lte: end },
            time,
            status: {
                $in: ['booked', 'completed', 'rescheduled'],
            },
        });

        console.log(isAlreadyBooked);

        if (isAlreadyBooked[0]?._id) {
            return new ApiResponse(res).badRequest(
                'Appointment already booked by someone else'
            );
        }

        const appointment = new Appointment({
            user: req.user._id,
            doctor: doctor_id,
            date: new Date(date),
            time,
            isPaid: false,
            status: 'booked',
        });

        const savedAppointment = await appointment.save();

        if (appointment._id) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Appointment booked'
            );
        }
        return new ApiResponse(res).error();
    } else {
        return new ApiResponse(res).unauthorized();
    }
};

export const getSingleAppointment = async (req, res) => {
    const { appointmentId } = req?.params;
    if (!appointmentId && isValidObjectId(appointmentId)) {
        return new ApiResponse(res).badRequest();
    }

    const appointment = await Appointment.findById(appointmentId)
        .select('-__v')
        .populate({ path: 'user', select: '-password -__v -token' })
        .populate({
            path: 'doctor',
            select: '-phone -__v -password -token',
            populate: { path: 'speciality', select: '-__v' },
        });
    console.log(req.user, req.user._id, appointment._id);
    if (appointment._id) {
        // sending appointment data by their authority.
        if (
            req.user?.role === 'admin' ||
            req.user?.role === 'staff' ||
            (req.user?.role === 'doctor' &&
                appointment.doctor._id.toString() ===
                    req.user._id.toString()) ||
            (req.user?.role === 'patient' &&
                appointment.user._id.toString() === req.user._id.toString())
        ) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Appointment found',
                appointment
            );
        } else {
            return new ApiResponse(res).unauthorized(
                'you are not allowed to perfom this operation'
            );
        }
    }

    return new ApiResponse(res).error(
        404,
        'not found',
        "Sorry! your appointment doesn't exist"
    );
};

export const getAllAppointments = async (req, res) => {
    if (req.user?.role === 'admin' || req.user?.role === 'staff') {
        const appointments = await Appointment.find()
            .select('-__v')
            .populate({
                path: 'user',
                select: '-password -__v -token -isActive',
            })
            .populate({
                path: 'doctor',
                select: '-password -__v -token -isActive',
                populate: { path: 'speciality', select: '-__v -isActive' },
            })
            .populate({
                path: 'notes.user',
                select: '_id name role',
            });

        if (appointments.length > 0) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Appointments found for admin/staff',
                appointments
            );
        }
        return new ApiResponse(res).error(
            404,
            'not found',
            'sorry! no appointments found'
        );
    }

    if (req.user?.role === 'doctor') {
        const appointments = await Appointment.find({ doctor: req.user._id })
            .select('-__v')
            .populate({
                path: 'user',
                select: '-password -__v -token -isActive',
            })
            .populate({
                path: 'doctor',
                select: '-password -__v -token -isActive',
                populate: { path: 'speciality', select: '-__v -isActive' },
            });
        if (appointments.length > 0) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Appointments found for the doctor',
                appointments
            );
        } else {
            return new ApiResponse(res).error(
                404,
                'not found',
                'sorry! no appointments found of the doctor'
            );
        }
    }

    if (req.user?.role === 'patient') {
        const appointments = await Appointment.find({ user: req.user._id })
            .select('-__v -notes -user')
            .populate({
                path: 'doctor',
                select: '-password -__v -token -isActive -phone',
                populate: { path: 'speciality', select: '-__v -isActive' },
            });

        if (appointments.length > 0) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'appointments found for the patient',
                appointments
            );
        } else {
            return new ApiResponse(res).error(
                404,
                'not found',
                "You didn't booked any appointments yet"
            );
        }
    }

    return new ApiResponse(res).unauthorized(
        'you are not allowed to perform this operation'
    );
};

export const putEditAppointmentDateTime = async (req, res) => {
    const { _id, date, time } = req?.body;

    if (!(_id && date && time) && isValidObjectId(_id)) {
        return new ApiResponse(res).badRequest('missing fields or invalid id');
    }

    let updateQuery = null;

    if (req.user?.role === 'admin' || req.user?.role === 'staff')
        updateQuery = { _id };
    else if (req.user?.role === 'doctor')
        updateQuery = { _id, doctor: req.user.id };

    const updatedAppointment = await Appointment.findOneAndUpdate(
        updateQuery,
        { date: new Date(date), time, status: 'rescheduled' },
        { new: true, user: req.user }
    );

    if (updatedAppointment) {
        return new ApiResponse(res).success(
            200,
            'ok',
            'appointment updated',
            updatedAppointment
        );
    }

    return new ApiResponse(res).unauthorized(
        "sorry! you're not allowed to perform this operation"
    );
};

export const putCompleteOrCancelAppointment = async (req, res) => {
    const { _id } = req?.params;
    const { status } = req?.body;

    if (!(_id && status && isValidObjectId(_id))) {
        return new ApiResponse(res).badRequest('missing fields or invalid id');
    }

    try {
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { _id },
            { status },
            { new: true, runValidators: true, user: req.user }
        )
            .select('-__v')
            .populate({
                path: 'user',
                select: '-password -__v -token -isActive -role',
            })
            .populate({
                path: 'notes.user',
                select: '-password -__v -token -appointments',
            });
        if (updatedAppointment._id) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'appointment status updated',
                updatedAppointment
            );
        }
        return new ApiResponse(res).error(
            404,
            'not found',
            'appointment not found'
        );
    } catch (error) {
        return new ApiResponse(res).badRequest(
            error.message,
            'invalid operation'
        );
    }
};

export const putAddAppointmentNote = async (req, res) => {
    if (req.user?.role === 'admin' || req.user?.role === 'staff') {
        try {
            const { _id } = req?.params;
            const { note } = req?.body;

            if (!(_id && isValidObjectId(_id))) {
                return new ApiResponse(res).badRequest(
                    'Please give a valid appointment id'
                );
            }
            if (!note) {
                return new ApiResponse(res).badRequest();
            }

            const updateNoteToAppointment = await Appointment.findByIdAndUpdate(
                _id,
                { $push: { notes: { user: req.user?._id, note } } },
                { new: true }
            );

            if (updateNoteToAppointment._id) {
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'note updated',
                    updateNoteToAppointment
                );
            }

            return new ApiResponse(res).error(
                404,
                'not found',
                'Sorry appointment not found'
            );
        } catch (error) {
            return new ApiResponse(res).error(500, 'error', error.message);
        }
    }
    return new ApiResponse(res).unauthorized(
        'you are not allowed to perform this operation.'
    );
};

export const deleteAppointmentNote = async (req, res) => {
    const { appointmentId, noteId } = req.params;

    if (
        !(
            appointmentId &&
            noteId &&
            isValidObjectId(appointmentId) &&
            isValidObjectId(noteId)
        )
    ) {
        return new ApiResponse(res).badRequest();
    }

    let query = { _id: appointmentId };

    if (req.user?.role === 'staff')
        query = { _id: appointmentId, 'notes.user': req.user._id };

    const deletedNote = await Appointment.findOneAndUpdate(
        query,
        {
            $pull: { notes: { _id: noteId } },
        },
        { new: true }
    );

    if (deletedNote._id) {
        return new ApiResponse(res).success(
            200,
            'ok',
            'note delated',
            deletedNote
        );
    }

    return new ApiResponse(res).error(404, 'not found', 'Note not found');
};

export const getSingleDoctorAppointments = async (req, res) => {
    if (req.user?.role === 'doctor') {
        // fetching apointment data's ==> last 7 days (including today)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const appointments = await Appointment.find({
            doctor: req.user?._id,
            updatedAt: {
                $gte: sevenDaysAgo,
                $lte: new Date(), // up to today
            },
        })
            .sort({ _id: -1 })
            .select('-__v')
            .populate({
                path: 'user',
                select: '-password -__v -token -isActive -role',
            })
            .populate({
                path: 'notes.user',
                select: '-password -__v -token -appointments',
            });

        if (appointments.length) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'data fetched',
                appointments
            );
        } else {
            return new ApiResponse(res).error(
                404,
                'not found',
                'sorry appointments not found'
            );
        }
    } else {
        return new ApiResponse(res).unauthorized(
            'You are not allowed perform this operation.'
        );
    }
};
