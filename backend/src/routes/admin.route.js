import { Router } from 'express';

// speciality controller imports
import {
    getSpecialities,
    patchEditSpeciality,
    postAddSpeciality,
    postChangeActiveStatus,
} from '../controllers/admin/speciality.admin.controller.js';

// doctor controller imports
import {
    postAddDoctor,
    getAdminDoctors,
    patchDeactiveOrReactiveDoctor,
    putEditDoctorInfo,
    getSingleDoctor,
} from '../controllers/admin/doctor.admin.controller.js';

// staff controller imports
import {
    getAdminStaffs,
    getSingleStaff,
    patchDeactiveOrReactiveStaff,
    postAddStaff,
    putEditStaffInfo,
} from '../controllers/admin/staff.admin.controller.js';

const adminRouter = Router();

// admin speciality routes
adminRouter.get('/speciality/get-all', getSpecialities);
adminRouter.post('/speciality/add', postAddSpeciality);
adminRouter.patch('/speciality/edit', patchEditSpeciality);
adminRouter.post('/speciality-change-active-status', postChangeActiveStatus);

// admin doctor routes
adminRouter.get('/doctor/get-all', getAdminDoctors);
adminRouter.get('/doctor/:docId', getSingleDoctor);
adminRouter.post('/doctor/add', postAddDoctor);
adminRouter.patch('/doctor/update-status', patchDeactiveOrReactiveDoctor);
adminRouter.put('/doctor/edit-info', putEditDoctorInfo);

// admin staff routes
adminRouter.get('/staff/get-all', getAdminStaffs);
adminRouter.get('/staff/:_id', getSingleStaff);
adminRouter.post('/staff/add', postAddStaff);
adminRouter.put('/staff/edit/:_id', putEditStaffInfo);
adminRouter.patch('/staff/update-status/:_id', patchDeactiveOrReactiveStaff);

export default adminRouter;
