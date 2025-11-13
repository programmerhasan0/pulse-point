import ApiResponse from '../utils/ApiResponse.util.js';

import Appointment from '../models/appointment.model.js';
import { isValidObjectId } from 'mongoose';

export const postCreateAppointment = async (req, res) => {
    if (req.user?.role === 'patient') {
        const { doctor_id, date, time } = req?.body;

        if (!(doctor_id && date && time)) {
            return new ApiResponse(res).badRequest();
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
            .populate({
                path: 'user',
                select: '-password -__v -token',
            })
            .populate({
                path: 'doctor',
                select: '-password -__v',
                populate: { path: 'speciality' },
            });

        if (appointments.length > 0) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Appointments found',
                appointments
            );
        }
        return new ApiResponse(res).error(
            404,
            'not found',
            'sorry! no appointments found'
        );
    } else {
        return new ApiResponse(res).unauthorized(
            'you are not allowed to perform this operation'
        );
    }
};

export const getSingleDoctorAppointments = async (req, res) => {
    if (req.user?.role === 'doctor') {
        const appointments = await Appointment.find({ doctor: req.user._id });
        if (appointments.length > 0) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Appointments found',
                appointments
            );
        }
        return new ApiResponse(res).error(
            404,
            'not found',
            'sorry! no appointments found of the doctor'
        );
    } else {
        return new ApiResponse(res).unauthorized(
            'you are not allowed to perform this operation'
        );
    }
};
