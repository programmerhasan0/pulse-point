//getting environment variables
import { config } from 'dotenv';
config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import ApiResponse from '../utils/ApiResponse.util.js';
import User from '../models/user.model.js';
import {
    sendPasswordResetMail,
    sendWelcomeEmail,
} from '../utils/sendEmail.util.js';
import { isValidObjectId } from 'mongoose';

export const postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!(email, password)) {
            return new ApiResponse(res).badRequest();
        }

        const user = await User.findOne({ email });
        if (user) {
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (isPasswordMatch) {
                const token = jwt.sign(
                    {
                        _id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                    },
                    process.env.JWT_PASS,
                    { expiresIn: '1d' }
                );
                return new ApiResponse(res).success(
                    200,
                    'ops success',
                    'Login Successful',
                    {
                        token,
                        user: {
                            _id: user._id,
                            name: user.name,
                            age: user.age,
                            gender: user.gender,
                            email: user.email,
                            phone: user.phone,
                            role: user.role,
                        },
                    }
                );
            } else {
                return new ApiResponse(res).error(
                    401,
                    "doesn't match",
                    "passwords doesn't match"
                );
            }
        } else {
            return new ApiResponse(res).error(
                400,
                'user not found',
                'User not found with the corresponding email'
            );
        }
    } catch (error) {
        return new ApiResponse(res).error(500, 'error', error.message);
    }
};

export const postCreateAccount = async (req, res, next) => {
    const { name, email, phone, password, confirmPassword, gender, age } =
        req.body;

    if (
        !(
            name &&
            email &&
            phone &&
            password &&
            confirmPassword &&
            gender &&
            age
        )
    ) {
        return new ApiResponse(res).badRequest();
    }

    if (password !== confirmPassword) {
        return new ApiResponse(res).error(
            400,
            'Bad Request',
            "Password and confirm password didn't match"
        );
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return new ApiResponse(res).error(
            409,
            'exist',
            'User already exist with the corresponding email.'
        );
    } else {
        const passwordHash = await bcrypt.hash(
            password,
            +process.env.BCRYPT_SALT
        );

        const newUser = new User({
            name,
            email,
            password: passwordHash,
            gender,
            age,
            phone,
            role: 'patient',
            isActive: true,
        });

        const savedUser = await newUser.save();
        if (savedUser.email) {
            sendWelcomeEmail(savedUser.name, savedUser.email);
            return new ApiResponse(res).success(
                201,
                'user created',
                'Account Creation successful'
            );
        } else {
            return new ApiResponse(res).error();
        }
    }
};

export const postPasswordResetToken = async (req, res, next) => {
    if (req.user) {
        return new ApiResponse(res).error(
            400,
            'logged in',
            'You are already logged in'
        );
    }
    const { email } = req?.body;

    if (!email) {
        return new ApiResponse(res).error(
            400,
            'email required',
            'Please provide your email'
        );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const updateUser = await User.findOneAndUpdate(
        { email },
        { token: hashedToken },
        { new: true }
    );

    if (updateUser.token.length > 0) {
        sendPasswordResetMail(updateUser, resetToken);
    }
    return new ApiResponse(res).success(
        200,
        'sent',
        'If your email is found in our database, a reset link has been sent to your email'
    );
};

export const postPasswordReset = async (req, res, next) => {
    const { token, password, confirmPassword } = req?.body;

    if (!(token && password && confirmPassword)) {
        return new ApiResponse(res).badRequest();
    }

    if (password !== confirmPassword) {
        return new ApiResponse(res).error(
            400,
            'not match',
            "Passwords doesn't match"
        );
    }

    const hashedTokenFromClient = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const passwordHash = await bcrypt.hash(password, +process.env.BCRYPT_SALT);

    const updateUser = await User.findOneAndUpdate(
        { token: hashedTokenFromClient },
        { password: passwordHash, token: null },
        { new: true }
    );

    if (updateUser?.password.length > 0) {
        return new ApiResponse(res).success(
            200,
            'updated',
            'Password updated! Please login'
        );
    }

    return new ApiResponse(res).success(
        400,
        'invalid',
        'Invalid token! Please try to reset again.'
    );
};

export const patchDoctorStaffUpdatePassword = async (req, res) => {
    const { token, password, confirmPassword } = req?.body;

    if (!(token && password && confirmPassword)) {
        return new ApiResponse(res).badRequest();
    }

    if (password !== confirmPassword) {
        return new ApiResponse(res).badRequest("passwords didn't match");
    }

    const genPwPrivateKey = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const passwordHash = await bcrypt.hash(password, +process.env.BCRYPT_SALT);
    const doctorOrStaff = await User.findOneAndUpdate(
        { token: genPwPrivateKey },
        { password: passwordHash, isActive: true, token: null },
        { new: true }
    );

    if (doctorOrStaff.password.length > 0) {
        return new ApiResponse(res).success(
            200,
            'ok',
            'Password Created! Please Login'
        );
    }
    return new ApiResponse(res).error();
};

export const getDoctors = async (req, res) => {
    const doctors = await User.find({ role: 'doctor' })
        .select('_id name email gender role speciality qualification')
        .populate('speciality');

    if (doctors.length > 0) {
        return new ApiResponse(res).success(
            200,
            'ok',
            'doctors found',
            doctors
        );
    }

    return new ApiResponse(res).error(404, 'not found', 'Doctors not found');
};

export const getMe = async (req, res) => {
    const me = await User.findById(req.user?._id).select(
        '-__v -token -password'
    );

    return new ApiResponse(res).success(200, 'ok', 'user found', me);
};

export const putUpdateUser = async (req, res) => {
    if (req.user?.role === 'patient') {
        try {
            const {
                name,
                phone,
                gender,
                age,
                password,
                confirmPassword,
                isChangingPassword,
            } = req.body;

            if (!(name && phone && gender && age)) {
                return new ApiResponse(res).badRequest();
            }

            if (isChangingPassword) {
                if (password !== confirmPassword) {
                    return new ApiResponse(res).badRequest(
                        "password and confirm password doesn't match."
                    );
                }

                const passwordHash = await bcrypt.hash(
                    password,
                    +process.env.BCRYPT_SALT
                );

                const updatedUser = await User.findByIdAndUpdate(
                    req.user?._id,
                    { name, phone, gender, age, password: passwordHash },
                    { new: true }
                ).select('-__v -token -password');

                if (updatedUser._id) {
                    return new ApiResponse(res).success(
                        200,
                        'ok',
                        'information updated',
                        updatedUser
                    );
                }
                return new ApiResponse(res).error(
                    404,
                    'not found',
                    'user not found'
                );
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.user?._id,
                { name, phone, gender, age },
                { new: true }
            ).select('-__v -token -password');

            if (updatedUser._id) {
                return new ApiResponse(res).success(
                    200,
                    'ok',
                    'information updated with password',
                    updatedUser
                );
            }
            return new ApiResponse(res).error(
                404,
                'not found',
                'user not found'
            );
        } catch (error) {
            return new ApiResponse(res).error(500, 'error', error.message);
        }
    }
    return new ApiResponse(res).unauthorized(
        'you are not allowed to perform this operation.'
    );
};
