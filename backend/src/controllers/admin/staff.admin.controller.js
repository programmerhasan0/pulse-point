import User from '../../models/user.model.js';
import ApiResponse from '../../utils/ApiResponse.util.js';
import { isValidObjectId } from 'mongoose';
import { sendCreatePasswordMail } from '../../utils/sendEmail.util.js';
import crypto from 'crypto';

export const postAddStaff = async (req, res) => {
    if (req.user?.role === 'admin') {
        try {
            const { email, phone, name, age, gender } = req?.body;

            if (!(email && phone && name && age && gender)) {
                return new ApiResponse(res).badRequest();
            }

            const pwPublicToken = crypto.randomBytes(32).toString('hex');
            const pwSecretToken = crypto
                .createHash('sha256')
                .update(pwPublicToken)
                .digest('hex');

            const staff = new User({
                name,
                age,
                phone,
                email,
                gender,
                role: 'staff',
                isActive: false,
                token: pwSecretToken,
            });

            const savedStaff = await staff.save();
            if (savedStaff._id) {
                sendCreatePasswordMail(savedStaff, pwPublicToken);
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'Staff created! an password creation link has been sent to the corresponding email.'
                );
            }
        } catch (error) {
            return new ApiResponse(res).error(500, 'error', error.message);
        }
    }

    return new ApiResponse(res).unauthorized(
        'you are not allowed to perform this operation.'
    );
};

export const getAdminStaffs = async (req, res) => {
    if (req.user?.role === 'admin') {
        try {
            const staffs = await User.find({ role: 'staff' }).select(
                '-__v -password -token'
            );

            if (staffs.length > 0) {
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'staffs fetched',
                    staffs
                );
            }
        } catch (error) {
            return new ApiResponse(res).error(500, 'error', error.message);
        }
    }
    return new ApiResponse(res).unauthorized(
        'you are not allowed to perform this operation.'
    );
};

export const getSingleStaff = async (req, res) => {
    if (req.user?.role === 'admin') {
        try {
            const { _id } = req?.params;

            if (!_id || !isValidObjectId(_id)) {
                return new ApiResponse(res).badRequest(
                    'missing fields or invalid id'
                );
            }
            const staff = await User.findById(_id).select(
                '-__v -password -token'
            );

            if (staff._id) {
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'staff found',
                    staff
                );
            }
            return new ApiResponse(res).error(
                404,
                'not found',
                'staff not found'
            );
        } catch (error) {
            return new ApiResponse(res).error(500, 'error', error.message);
        }
    }
    return new ApiResponse(res).unauthorized(
        'You are not authorized to perform this operation.'
    );
};

export const patchDeactiveOrReactiveStaff = async (req, res) => {
    if (req.user?.role === 'admin') {
        try {
            const { _id } = req?.params;
            const { isActive } = req?.body;

            if (!_id || isActive === undefined) {
                return new ApiResponse(res).badRequest();
            }

            const updateActiveStatus = await User.findByIdAndUpdate(
                _id,
                { isActive },
                { new: true }
            ).select('-__v -password -token');
            if (isActive === updateActiveStatus.isActive) {
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'staff status updated',
                    updateActiveStatus
                );
            }
            return new ApiResponse(res).error();
        } catch (error) {
            return new ApiResponse(res).error(500, 'error', error.message);
        }
    } else {
        return new ApiResponse(res).unauthorized(
            'You are not authorized to perform this operation.'
        );
    }
};

export const putEditStaffInfo = async (req, res) => {
    if (req.user?.role === 'admin') {
        try {
            const { _id } = req?.params;
            const { email, phone, name, age, gender } = req?.body;

            if (!(email && phone && name && age && gender)) {
                return new ApiResponse(res).badRequest();
            }

            const updatedStaff = await User.findByIdAndUpdate(
                _id,
                { name, age, phone, email, gender },
                { new: true }
            ).select('-__v -password -token');

            if (updatedStaff._id) {
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'Staff information update success',
                    updatedStaff
                );
            }
        } catch (error) {
            return new ApiResponse(res).error(500, 'error', error.message);
        }

        return new ApiResponse(res).error();
    } else {
        return new ApiResponse(res).unauthorized(
            'You are not authorized to perform this operation.'
        );
    }
};
