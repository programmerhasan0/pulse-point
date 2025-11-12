import { Router } from 'express';
import {
    postCreateAccount,
    postLogin,
    postPasswordReset,
    postPasswordResetToken,
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', postLogin);
authRouter.post('/create-account', postCreateAccount);
authRouter.post('/get-reset-token', postPasswordResetToken);
authRouter.post('/reset-password', postPasswordReset);

export default authRouter;
