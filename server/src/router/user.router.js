import express from 'express';
import { getAllUsers, getUserById, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getAllUsers);
router.put('/:id', updateUser);

export default router;
