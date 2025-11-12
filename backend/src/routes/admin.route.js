import { Router } from 'express';
import {
    getSpecialities,
    patchEditSpeciality,
    postAddSpeciality,
    postChangeActiveStatus,
} from '../controllers/admin/speciality.admin.controller.js';

import { postAddDoctor } from '../controllers/admin/doctor.admin.controller.js';

const adminRouter = Router();

adminRouter.get('/view-specialities', getSpecialities);
adminRouter.post('/add-speciality', postAddSpeciality);
adminRouter.post('/speciality-change-active-status', postChangeActiveStatus);
adminRouter.patch('/edit-speciality', patchEditSpeciality);

adminRouter.post('/doctor/add', postAddDoctor);

export default adminRouter;
