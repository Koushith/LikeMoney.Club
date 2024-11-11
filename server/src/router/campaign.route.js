import express from 'express';
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaignById,
  deleteCampaignById,
} from '../controllers/campaign.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').post(authMiddleware, createCampaign).get(authMiddleware, getAllCampaigns);

router
  .route('/:id')
  .get(authMiddleware, getCampaignById)
  .put(authMiddleware, updateCampaignById)
  .delete(authMiddleware, deleteCampaignById);

export default router;
