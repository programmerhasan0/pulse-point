import { Router } from 'express';

const appointmentRouter = Router();

import {
    getSingleAppointment,
    postCreateAppointment,
    getAllAppointments,
    getSingleDoctorAppointments,
} from '../controllers/appointment.controller.js';

// doctors appointment related routes
appointmentRouter.get('/doctor/view/', getSingleDoctorAppointments);

// admin's and staff's appointment related routes
appointmentRouter.get('/view/get-all', getAllAppointments);

// common appointment related routes
appointmentRouter.post('/create', postCreateAppointment);
appointmentRouter.get('/view/:appointmentId', getSingleAppointment);

export default appointmentRouter;
