import { config } from 'dotenv';
config();
import express from 'express';
import authMiddleware from './src/middlewares/auth.middleware.js';
import ApiResponse from './src/utils/ApiResponse.util.js';
import cors from 'cors';

//routes
import authRouter from './src/routes/auth.route.js';
import adminRouter from './src/routes/admin.route.js';
import appointmentRouter from './src/routes/appointment.route.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded());

//Home route
app.get('/', (req, res) =>
    new ApiResponse(res).success(200, 'ok', 'Server running')
);

// routes
app.use('/api/auth/', authRouter);
app.use('/api/admin/', authMiddleware, adminRouter);
app.use('/api/appointment/', authMiddleware, appointmentRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
