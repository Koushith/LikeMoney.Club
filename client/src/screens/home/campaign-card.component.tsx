import ProtoImg from "@/assets/proto.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, DollarSignIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CampaignCardProps } from "./types";

const backgroundImages = [
  ProtoImg,
  "https://proofofliving.in/static/media/banner-2.6ce411cc58eaf163b63a.avif",
  "https://framerusercontent.com/images/zoCYa3hQ3F2G4JtvWzpYa4yBNdA.png?scale-down-to=2048", // Coldplay image URL
];

export const getRandomBackgroundImage = () =>
  backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

// Update the Campaign interface to include an image URL

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  console.log("campaign", campaign);
  const randomBackgroundImage = getRandomBackgroundImage();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative w-full h-48">
          <img
            src={randomBackgroundImage}
            alt={campaign.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-500/50 mix-blend-overlay" />
        </div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{campaign?.name}</CardTitle>
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {campaign?.name?.slice(0, 2).toUpperCase() ?? "N/A"}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardDescription>
            <Badge variant="secondary">{campaign.taggedBusiness}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <EyeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{campaign.minViews} views</span>
            </div>
            <div className="flex items-center">
              <DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">${campaign.budget}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {new Date(campaign.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {campaign.endDate
                  ? new Date(campaign.endDate).toLocaleDateString()
                  : "No end date"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => navigate(`/campaign/${campaign._id}`)}
            className="w-full"
          >
            View More Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export const CampaignCardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="relative w-full h-48">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <Skeleton className="h-5 w-1/3 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
