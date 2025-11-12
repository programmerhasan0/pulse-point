import { config } from 'dotenv';
config();
import express from 'express';
import authRouter from './src/routes/auth.route.js';
import ApiResponse from './src/utils/ApiResponse.util.js';
import cors from 'cors';

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
