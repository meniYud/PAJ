import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import positionsRoutes from './positions/positionsRoutes.js';
import userRoutes from './users/userRoutes.js';
import companyRoutes from './companies/companyRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/positions', positionsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/pick-a-job-frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'pick-a-job-frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));