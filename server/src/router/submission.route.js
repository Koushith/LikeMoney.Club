import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getSubmissionsByCampaignId, updateSubmissionByCampaignId } from '../controllers/submission.controller.js';

const router = Router();

router.put('/:campaignId', authMiddleware, updateSubmissionByCampaignId);
router.get('/:campaignId', authMiddleware, getSubmissionsByCampaignId);

export default router;
