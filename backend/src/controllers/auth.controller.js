//getting environment variables
import { config } from 'dotenv';
config();

import bcrypt from 'bcryptjs';
import ApiResponse from '../utils/ApiResponse.util.js';
import User from '../models/user.model.js';
import { sendWelcomeEmail } from '../utils/sendEmail.util.js';

export const postLogin = (req, res, next) => {
    console.log(req.body);
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
        return new ApiResponse(res).error(
            400,
            'Bad request',
            'One or more fields are missing'
        );
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
