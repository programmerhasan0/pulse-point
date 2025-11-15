import { Router } from 'express';

const appointmentRouter = Router();

import {
    getSingleAppointment,
    postCreateAppointment,
    getAllAppointments,
    putEditAppointmentDateTime,
    putCompleteOrCancelAppointment,
    putAddAppointmentNote,
    deleteAppointmentNote,
} from '../controllers/appointment.controller.js';

// admin's and staff's appointment related routes
appointmentRouter.get('/view/get-all', getAllAppointments);
appointmentRouter.put('/note/add/:_id', putAddAppointmentNote);
appointmentRouter.delete(
    '/note/delete/:appointmentId/:noteId',
    deleteAppointmentNote
);

// common appointment related routes
appointmentRouter.post('/create', postCreateAppointment);
appointmentRouter.put('/change-status/:_id', putCompleteOrCancelAppointment);
appointmentRouter.put('/edit', putEditAppointmentDateTime);
appointmentRouter.get('/view/:appointmentId', getSingleAppointment);

export default appointmentRouter;
