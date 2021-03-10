import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import positionsRoutes from './positions/positionsRoutes.js';
import userRoutes from './users/userRoutes.js';
import starsRoutes from './stars/starsRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running')
});

app.use('/api/positions', positionsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stars', starsRoutes);

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));