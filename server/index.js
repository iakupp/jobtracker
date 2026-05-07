import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';
import jobRouter from './routes/jobs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }))
app.use(express.json())

//Routes
app.use('/api/auth', authRouter)
app.use('/api/jobs', jobRouter)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Job-Tracker API' });
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => console.log(err))
