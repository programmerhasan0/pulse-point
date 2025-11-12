import { Router } from 'express';
import {
    postCreateAccount,
    postLogin,
    postPasswordResetToken,
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', postLogin);
authRouter.post('/create-account', postCreateAccount);
authRouter.post('/get-reset-token', postPasswordResetToken);

export default authRouter;
