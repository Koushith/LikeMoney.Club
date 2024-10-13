import { motion } from "framer-motion";
import { CampaignCardProps } from "./types";
import { getRandomBackgroundImage } from "./campaign-card.component";
import { Button } from "@/components/ui/button";

export const CampaignList: React.FC<CampaignCardProps> = ({ campaign }) => {
  const randomBackgroundImage = getRandomBackgroundImage();
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <hr
        role="presentation"
        className="w-full border-t border-zinc-950/10 dark:border-white/10"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-6 py-6">
          <div className="w-32 shrink-0">
            <img
              className="aspect-[3/2] rounded-lg shadow-sm"
              src={randomBackgroundImage}
              alt={campaign.name}
            />
          </div>
          <div className="space-y-1.5">
            <div className="text-base/6 font-semibold">{campaign.name}</div>
            <div className="text-xs/6 text-zinc-500">
              {new Date(campaign.startDate).toLocaleDateString()} -{" "}
              {campaign.endDate
                ? new Date(campaign.endDate).toLocaleDateString()
                : "No end date"}{" "}
              <span aria-hidden="true">·</span> {campaign.taggedBusiness}
            </div>
            <div className="text-xs/6 text-zinc-600">
              {campaign.minViews} views
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <Badge variant="secondary">
              {campaign.zpkRequired ? "ZPK Required" : "Open"}
            </Badge> */}
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
          </Button>
        </div>
      </div>
    </motion.li>
  );
};

export const CampaignListSkeleton: React.FC = () => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <hr
        role="presentation"
        className="w-full border-t border-zinc-950/10 dark:border-white/10"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-6 py-6">
          <div className="w-32 shrink-0">
            <div className="aspect-[3/2] rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-64 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.li>
  );
};
