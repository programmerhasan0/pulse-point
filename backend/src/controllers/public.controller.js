import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.util.js';
import Speciality from '../models/speciality.model.js';
import { isValidObjectId } from 'mongoose';

export const getAllDoctors = async (req, res) => {
    const doctors = await User.find({ role: 'doctor' })
        .select('-token -password -__v -phone')
        .populate({ path: 'speciality', select: '-__v' });

    if (doctors.length > 0) {
        return new ApiResponse(res).success(
            200,
            'ok',
            'doctors found',
            doctors
        );
    }

    return new ApiResponse(res).error(404, 'not found', 'doctors not found');
};

export const getSingleDoctor = async (req, res) => {
    const { docId } = req.params;

    if (!isValidObjectId(docId)) {
        return new ApiResponse(res).badRequest(
            'Please Enter a valid doctor id'
        );
    }
    const doctor = await User.findById(docId)
        .select('-token -password -__v -phone')
        .populate({ path: 'speciality', select: '-__v' });

    if (doctor._id) {
        return new ApiResponse(res).success(200, 'ok', 'Doctor found', doctor);
    }
    return new ApiResponse(res).error();
};

export const getAllSpecialities = async (req, res) => {
    const specilities = await Speciality.find().select('-__v');
    if (specilities.length > 0) {
        return new ApiResponse(res).success(
            200,
            'ok',
            'data found',
            specilities
        );
    } else {
        return new ApiResponse(res).error(
            404,
            'not found',
            'Speciality data is not available.'
        );
    }
};
