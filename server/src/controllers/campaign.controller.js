import Campaign from "../model/campaign.js";
/**
 * create a campaign
 * get all campaigns
 * get a campaign by id
 * update a campaign by id
 * delete a campaign by id
 */

/**
 * Create a new campaign
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createCampaign = async (req, res) => {
  try {
    const { title, description, budget, user } = req.body;
    const campaign = await Campaign.create({
      title,
      description,
      budget,
      user,
    });
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieve all campaigns
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieve a campaign by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update a campaign by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, budget, user } = req.body;
    const campaign = await Campaign.findByIdAndUpdate(id, {
      title,
      description,
      budget,
      user,
    });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a campaign by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    await Campaign.findByIdAndDelete(id);
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};