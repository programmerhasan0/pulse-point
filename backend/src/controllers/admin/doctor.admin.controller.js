import crypto from 'crypto';
import { sendCreatePasswordMail } from '../../utils/sendEmail.util.js';
import User from '../../models/user.model.js';
import ApiResponse from '../../utils/ApiResponse.util.js';
import { isValidObjectId } from 'mongoose';

export const postAddDoctor = async (req, res) => {
    // TODO : add doctor picture upload functionality
    if (req.user?.role === 'admin') {
        const { email, phone, name, age, gender, speciality, qualification } =
            req?.body;

        if (
            !(
                email &&
                phone &&
                name &&
                age &&
                gender &&
                speciality &&
                qualification
            )
        ) {
            return new ApiResponse(res).badRequest();
        }
        const pwPublicToken = crypto.randomBytes(32).toString('hex');
        const pwSecretToken = crypto
            .createHash('sha256')
            .update(pwPublicToken)
            .digest('hex');

        const doctor = new User({
            name,
            age,
            phone,
            email,
            gender,
            speciality,
            qualification,
            role: 'doctor',
            isActive: false,
            token: pwSecretToken,
        });

        const savedDoctor = await doctor.save();

        if (savedDoctor._id) {
            sendCreatePasswordMail(savedDoctor, pwPublicToken);
            return new ApiResponse(res).success(
                200,
                'ok',
                'Doctor creation success! a password creation list has been sent to his/her email'
            );
        }

        return new ApiResponse(res).error();
    } else {
        return new ApiResponse(res).unauthorized(
            'You are not authorized to perform this operation.'
        );
    }
};

export const getAdminDoctors = async (req, res) => {
    if (req.user?.role === 'admin' || req.user?.role === 'staff') {
        const doctors = await User.find({ role: 'doctor' })
            .select('-password -role')
            .populate('speciality');

        if (doctors.length > 0) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'doctors found',
                doctors
            );
        }

        return new ApiResponse(res).error(
            404,
            'not found',
            'Doctors not found'
        );
    }
    return new ApiResponse(res).unauthorized(
        'You are not authorized to perform this operation.'
    );
};

export const patchDeactiveOrReactiveDoctor = async (req, res) => {
    if (req.user?.role === 'admin') {
        const { _id, isActive } = req?.body;

        if (!_id || isActive === undefined) {
            return new ApiResponse(res).badRequest();
        }

        const updateActiveStatus = await User.findByIdAndUpdate(
            _id,
            { isActive },
            { new: true }
        ).select('-password -__v -token');
        if (isActive === updateActiveStatus.isActive) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'doctor status updated',
                updateActiveStatus
            );
        }
        return new ApiResponse(res).error();
    } else {
        return new ApiResponse(res).unauthorized(
            'You are not authorized to perform this operation.'
        );
    }
};

export const putEditDoctorInfo = async (req, res) => {
    // TODO : add doctor picture upload functionality
    if (req.user?.role === 'admin') {
        console.log(req.body);
        const {
            _id,
            email,
            phone,
            name,
            age,
            gender,
            speciality,
            qualification,
        } = req?.body;

        if (
            !(
                _id &&
                email &&
                phone &&
                name &&
                age &&
                gender &&
                speciality &&
                qualification
            )
        ) {
            return new ApiResponse(res).badRequest();
        }

        const updateDoctor = await User.findByIdAndUpdate(
            _id,
            {
                name,
                age,
                phone,
                email,
                gender,
                speciality,
                qualification,
            },
            { new: true }
        );

        if (updateDoctor._id) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Doctor information update success'
            );
        }

        return new ApiResponse(res).error();
    } else {
        return new ApiResponse(res).unauthorized(
            'You are not authorized to perform this operation.'
        );
    }
};

export const getSingleDoctor = async (req, res) => {
    if (req.user?.role === 'admin') {
        const { docId } = req.params;

        if (!isValidObjectId(docId)) {
            return new ApiResponse(res).badRequest(
                'Please Enter a valid doctor id'
            );
        }
        const doctor = await User.findById(docId)
            .select('_id name age phone email gender speciality qualification')
            .populate('speciality');

        if (doctor._id) {
            return new ApiResponse(res).success(
                200,
                'ok',
                'Doctor found',
                doctor
            );
        }
        return new ApiResponse(res).error();
    } else {
        return new ApiResponse(res).unauthorized(
            'You are not authorized to perform this operation.'
        );
    }
};
