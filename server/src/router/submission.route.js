import { Router } from 'express';
import { getSubmissionsByCampaignId, updateSubmissionByCampaignId } from '../controllers/submission.controller.js';

const router = Router();

router.put('/:campaignId', updateSubmissionByCampaignId);
router.get('/:campaignId', getSubmissionsByCampaignId);

export default router;
