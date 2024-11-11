import express from 'express';
import { connectDB } from './utils/connectDB.js';
import dotenv from 'dotenv';
import reclaimRouter from './router/reclaim.route.js';
import campaignRouter from './router/campaign.route.js';
import submissionRouter from './router/submission.route.js';
import authRouter from './router/auth.router.js';
import userRouter from './router/user.router.js';
import cors from 'cors';
import fetch from 'node-fetch';

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
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// const paymentStatusMessage = (paymentInfo) => {
//   console.log('paymentStatusMessage hit');
//   const {
//     type = '🎉 New Payment Received! 🎉',
//     id = 'pi_3QHkJpHLP3Auq2lN0qQGQSGA',
//     customerId = 'cus_P55555555555555555555555',
//     amount = 200000,
//     status = 'completed',
//     paidAmount = 200000,
//     subscriptionId = null,
//     invoiceId = 'in_3QHkJpHLP3Auq2lN0qQGQSGA',
//     customerEmail = 'billing@opendatalabs.xyz',
//     invoiceUrl = 'https://dashboard.stripe.com/invoices/in_3QHkJpHLP3Auq2lN0qQGQSGA',
//     customerName = 'Vana',
//   } = paymentInfo;

//   return `\`\`\`
//   🎉 🎉 New Payment Received! 🎉
//   -------------------------------------
//   ID:                pi_3QHkJpHLP3Auq2lN0qQGQSGA
//   Customer ID:       cus_P55555555555555555555555
//   Amount:            $2000.00
//   Status:            completed
//   Paid Amount:       $2000.00
//   Subscription ID:   N/A
//   Invoice ID:        in_3QHkJpHLP3Auq2lN0qQGQSGA
//   Customer Email:    billing@opendatalabs.xyz
//   Invoice URL:       https://dashboard.stripe.com/invoices/in_3QHkJpHLP3Auq2lN0qQGQSGA
//   Customer Name:     Vana
//   -------------------------------------
//   This payment information was processed automatically.
//   \`\`\``;
// };

// app.get('/api/slack', async (req, res) => {
//   try {
//     console.log('Slack alert hit');
//     const paymentInfo = {
//       type: '🎉 New Payment Received! 🎉',
//       id: 'pi_3QHkJpHLP3Auq2lN0qQGQSGA',
//       customerId: 'cus_P55555555555555555555555',
//       amount: 200000,
//       status: 'completed',
//       paidAmount: 200000,
//       subscriptionId: 'sub_3QHkJpHLP3Auq2lN0qQGQSGA',
//       invoiceId: 'in_3QHkJpHLP3Auq2lN0qQGQSGA',
//       customerEmail: 'billing@opendatalabs.xyz',
//       invoiceUrl: 'https://dashboard.stripe.com/invoices/in_3QHkJpHLP3Auq2lN0qQGQSGA',
//       customerName: 'Vana',
//     };
//     const message = paymentStatusMessage(paymentInfo);
//     console.log('message', message);
//     const result = await sendSlackMessage(PAYMENT_ALERT_CHANNEL, message);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} - http://localhost:${PORT}`);
});
