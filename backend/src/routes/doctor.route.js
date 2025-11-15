import { Router } from 'express';
import {
    putDoctorUpdatePassword,
    putUpdateConsultingStatus,
} from '../controllers/doctor.controller.js';

const doctorRouter = Router();

doctorRouter.put('/change-consulting-status', putUpdateConsultingStatus);
doctorRouter.put('/change-password', putDoctorUpdatePassword);

export default doctorRouter;
