import { config } from 'dotenv';
config();
import bcrypt from 'bcryptjs';

import ApiResponse from '../utils/ApiResponse.util.js';
import User from '../models/user.model.js';

export const putStaffUpdatePassword = async (req, res) => {
    if (req.user?.role === 'staff') {
        try {
            const { password, confirmPassword } = req?.body;

            if (!(password && confirmPassword)) {
                return new ApiResponse(res).badRequest();
            }

            if (password !== confirmPassword) {
                return new ApiResponse(res).unauthorized(
                    "password and confirm password doesn't match."
                );
            }
            const passwordHash = await bcrypt.hash(
                password,
                +process.env.BCRYPT_SALT
            );

            const updatedPassword = await User.findByIdAndUpdate(
                req.user?._id,
                { password: passwordHash },
                { new: true }
            ).select('-__v -password -token');

            console.log(updatedPassword);

            if (updatedPassword._id) {
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'password updated',
                    updatedPassword
                );
            }

            return new ApiResponse(res).error();
        } catch (error) {
            return new ApiResponse(res).error(500, 'error', error.message);
        }
    }
    return new ApiResponse(res).unauthorized(
        'You are not allowed perform this operation.'
    );
};
