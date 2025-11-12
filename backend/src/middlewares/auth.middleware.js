import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/ApiResponse.util.js';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return new ApiResponse(res).unauthorized('Unahorized! please login');
    }

    try {
        const isValidJwt = jwt.verify(authorization, process.env.JWT_PASS);
        const user = await User.findById(isValidJwt._id);
        if (user.email) {
            req.user = user;
            return next();
        }
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            if (err instanceof jwt.TokenExpiredError) {
                return new ApiResponse(res).unauthorized(
                    'Token expired! Please relogin'
                );
            } else {
                return new ApiResponse(res).unauthorized(
                    'Invalid token! Please relogin'
                );
            }
        } else {
            return new ApiResponse(res).error();
        }
    }
};

export default authMiddleware;
