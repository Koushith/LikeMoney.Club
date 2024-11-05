import Campaign from '../model/campaign.js';
import Submission from '../model/submission.js';

export const updateSubmissionByCampaignId = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { extractedProof, reclaimRawProof } = req.body;
    const userId = '67004fdeff27e63129bb908c';

    // Find the campaign by ID
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Check for an existing submission by the same user for the same campaign
    let submission = await Submission.findOne({ campaign: campaignId, user: userId });

    if (submission) {
      // Update existing submission
      submission.content = extractedProof; // update the proofs
      submission.reclaimRawProof = reclaimRawProof; // update the extracted proofs
      await submission.save();
    } else {
      // Create a new submission
      submission = await Submission.create({
        campaign: campaignId,
        user: userId,
        content: extractedProof,
        reclaimRawProof: reclaimRawProof,
      });

      // Append submission to campaign
      campaign.submissions.push(submission._id);
      await campaign.save();
    }

    return res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error updating submission', error });
  }
};
