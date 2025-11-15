import { Router } from 'express';
import { putStaffUpdatePassword } from '../controllers/staff.controller.js';

const staffRouter = Router();

staffRouter.put('/change-password', putStaffUpdatePassword);

export default staffRouter;
