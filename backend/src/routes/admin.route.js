import { Router } from 'express';
import {
    getSpecialities,
    patchEditSpeciality,
    postAddSpeciality,
    postChangeActiveStatus,
} from '../controllers/admin.controller.js';

const adminRouter = Router();

adminRouter.get('/view-specialities', getSpecialities);
adminRouter.post('/add-speciality', postAddSpeciality);
adminRouter.post('/speciality-change-active-status', postChangeActiveStatus);
adminRouter.patch('/edit-speciality', patchEditSpeciality);

export default adminRouter;
