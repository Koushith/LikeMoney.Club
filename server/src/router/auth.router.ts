import express from 'express';
import { signIn } from '../controllers/auth.controller';

const router = express.Router();

router.route('/').post(signIn);

export default router;
