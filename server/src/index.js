import express from 'express';
import { connectDB } from './utils/connectDB.js';
import dotenv from 'dotenv';
import reclaimRouter from './router/reclaim.route.js';
import campaignRouter from './router/campaign.route.js';
import submissionRouter from './router/submission.route.js';
import authRouter from './router/auth.router.js';
import cors from 'cors';

// Add error handling to dotenv.config()
dotenv.config();

const app = express();
const PORT = 8000;

connectDB();
app.use(express.json());
app.use(cors());
// Use campaign router
app.use('/api/campaigns', campaignRouter);
app.use('/api/reclaim', reclaimRouter);
app.use('/api/submission', submissionRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} - http://localhost:${PORT}`);
});
