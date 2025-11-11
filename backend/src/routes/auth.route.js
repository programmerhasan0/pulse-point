import { Router } from 'express';
import {
    postCreateAccount,
    postLogin,
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', postLogin);
authRouter.post('/create-account', postCreateAccount);

export default authRouter;
