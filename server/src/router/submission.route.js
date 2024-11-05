import { Router } from 'express';
import { updateSubmissionByCampaignId } from '../controllers/submission.controller.js';

const router = Router();

router.put('/:campaignId', updateSubmissionByCampaignId);

export default router;
