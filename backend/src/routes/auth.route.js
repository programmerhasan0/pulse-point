import { Router } from 'express';
import {
    postCreateAccount,
    postLogin,
    postPasswordReset,
    postPasswordResetToken,
    patchDoctorStaffUpdatePassword,
    getDoctors,
} from '../controllers/auth.controller.js';

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

export default authRouter;
