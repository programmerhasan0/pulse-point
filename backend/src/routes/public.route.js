import { Router } from 'express';
import {
    getAllDoctors,
    getAllSpecialities,
    getSingleDoctor,
} from '../controllers/public.controller.js';

const publicRouter = Router();

publicRouter.get('/doctor/get-all', getAllDoctors);
publicRouter.get('/doctor/:docId', getSingleDoctor);
publicRouter.get('/specialities/get-all', getAllSpecialities);

export default publicRouter;
