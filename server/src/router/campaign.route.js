import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaignById,
  deleteCampaignById,
} from "../controllers/campaign.controller.js";

const router = express.Router();

router.route("/").post(createCampaign).get(getAllCampaigns);

router
  .route("/:id")
  .get(getCampaignById)
  .put(updateCampaignById)
  .delete(deleteCampaignById);

export default router;
