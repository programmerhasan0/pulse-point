import { Router } from 'express';
import {
    getAllDoctors,
    getAllSpecialities,
    getSingleDoctor,
    getBookedSlots,
} from '../controllers/public.controller.js';

const publicRouter = Router();

publicRouter.get('/doctor/get-all', getAllDoctors);
publicRouter.get('/doctor/:docId', getSingleDoctor);
publicRouter.get('/specialities/get-all', getAllSpecialities);
publicRouter.get('/appointments/booked', getBookedSlots);

export default publicRouter;
