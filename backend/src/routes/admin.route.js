import { Router } from 'express';
import {
    getSpecialities,
    patchEditSpeciality,
    postAddSpeciality,
    postChangeActiveStatus,
} from '../controllers/admin/speciality.admin.controller.js';

import {
    postAddDoctor,
    getAdminDoctors,
    patchDeactiveOrReactiveDoctor,
    putEditDoctorInfo,
    getSingleDoctor,
} from '../controllers/admin/doctor.admin.controller.js';

const adminRouter = Router();

adminRouter.get('/speciality/get-all', getSpecialities);
adminRouter.post('/speciality/add', postAddSpeciality);
adminRouter.patch('/speciality/edit', patchEditSpeciality);
adminRouter.post('/speciality-change-active-status', postChangeActiveStatus);

adminRouter.get('/doctor/get-all', getAdminDoctors);
adminRouter.get('/doctor/:docId', getSingleDoctor);
adminRouter.post('/doctor/add', postAddDoctor);
adminRouter.patch('/doctor/update-status', patchDeactiveOrReactiveDoctor);
adminRouter.put('/doctor/edit-info', putEditDoctorInfo);

export default adminRouter;
