import crypto from 'crypto';
import { sendCreatePasswordMail } from '../../utils/sendEmail.util.js';
import User from '../../models/user.model.js';
import ApiResponse from '../../utils/ApiResponse.util.js';

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
        return new ApiResponse(res).unauthorized();
    }
};