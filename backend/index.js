import { config } from 'dotenv';
config();
import express from 'express';
import authRouter from './src/routes/auth.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// routes
app.use('/api/auth/', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
