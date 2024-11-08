export interface Campaign {
  _id: string;
  name: string;
  description?: string;
  bannerImage: string;
  taggedBusiness?: string;
  minViews?: number;
  budget?: number;
  startDate: Date;
  endDate?: Date;
  user?: string;
  submissions?: string[];
}

// Components
export interface CampaignCardProps {
  campaign: Campaign;
}
