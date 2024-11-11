import User from '../model/user.js';
import Campaign from '../model/campaign.js';
import Submission from '../model/submission.js';

export const updateSubmissionByCampaignId = async (req, res) => {
  try {
    console.log('updateSubmissionByCampaignId hit');
    const user = req.user;
    console.log('user- FROM MIDDLEWARE NO ', user);
    const { campaignId } = req.params;
    const { extractedProof, reclaimRawProof } = req.body;

    if (!user) {
      return res.status(401).json({ message: 'Token is missing or invalid' });
    }

    // Find the campaign by ID
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Check for an existing submission by the same user for the same campaign
    let submission = await Submission.findOne({ campaign: campaignId, user: user._id });

    if (submission) {
      // Update existing submission
      submission.content = extractedProof; // update the proofs
      submission.reclaimRawProof = reclaimRawProof; // update the extracted proofs
      await submission.save();
    } else {
      // Create a new submission
      submission = await Submission.create({
        campaign: campaignId,
        user: user._id,
        content: extractedProof,
        reclaimRawProof: reclaimRawProof,
      });

      // Append submission to campaign
      campaign.submissions.push(submission._id);
      await campaign.save();
    }

    return res.status(200).json(submission);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Error updating submission', error });
  }
};

export const getSubmissionsByCampaignId = async (req, res) => {
  try {
    console.log('getSubmissionsByCampaignId hit');
    const { campaignId } = req.params;
    const submissions = await Submission.find({ campaign: campaignId }).populate('user');
    console.log('submissions', submissions);

    res.status(200).json(submissions);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Error getting submissions', error });
  }
};
