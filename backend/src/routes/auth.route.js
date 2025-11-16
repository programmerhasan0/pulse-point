import { Router } from 'express';
import {
    postCreateAccount,
    postLogin,
    postPasswordReset,
    postPasswordResetToken,
    patchDoctorStaffUpdatePassword,
    getDoctors,
    getMe,
    putUpdateUser,
} from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/login', postLogin);
authRouter.post('/create-account', postCreateAccount);
authRouter.post('/get-reset-token', postPasswordResetToken);
authRouter.post('/reset-password', postPasswordReset);

authRouter.patch(
    '/doctor-staff/update-password',
    patchDoctorStaffUpdatePassword
);
authRouter.get('/doctor/get-all', getDoctors);
authRouter.get('/me', authMiddleware, getMe);
authRouter.put('/update-profile', authMiddleware, putUpdateUser);

export default authRouter;
