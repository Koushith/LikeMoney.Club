import { useState } from "react";
import { Users, Building, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "influencers" | "businesses" | "how"
  >("influencers");

  const tabContent = {
    influencers: {
      icon: <Users className="w-12 h-12 mb-4" />,
      title: "For Influencers",
      description:
        "Discover campaigns that align with your brand. Grow your audience and earn while doing what you love.",
      features: [
        "Match with relevant brands",
        "Easy application process",
        "Track campaign progress",
        "Secure payments",
      ],
    },
    businesses: {
      icon: <Building className="w-12 h-12 mb-4" />,
      title: "For Businesses",
      description:
        "Connect with influencers who truly understand and represent your brand values.",
      features: [
        "Create targeted campaigns",
        "Access a diverse influencer pool",
        "Real-time campaign analytics",
        "Brand safety controls",
      ],
    },
    how: {
      icon: <Zap className="w-12 h-12 mb-4" />,
      title: "How It Works",
      description:
        "Our platform makes influencer marketing simple, efficient, and effective.",
      features: [
        "Sign up and create your profile",
        "Browse or list campaigns",
        "Apply or approve collaborations",
        "Execute campaigns and track results",
      ],
    },
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-8 rounded-lg mb-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24 animate-pulse" />

      <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 relative z-10">
        Welcome to Like.Money
      </h2>
      <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl relative z-10">
        Bridging the gap between influential voices and innovative brands.
        Discover, connect, and grow with Like.Money.
      </p>

      <div className="flex flex-col sm:flex-row mb-6 relative z-10">
        {(["influencers", "businesses", "how"] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "secondary" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="mb-2 sm:mb-0 sm:mr-4"
          >
            {tabContent[tab].title}
          </Button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white bg-opacity-20 p-4 sm:p-6 rounded-lg relative z-10"
      >
        <div className="flex flex-col sm:flex-row items-start">
          <div className="mb-4 sm:mb-0 sm:mr-6">
            {tabContent[activeTab].icon}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              {tabContent[activeTab].title}
            </h3>
            <p className="mb-4">{tabContent[activeTab].description}</p>
            <ul className="list-disc pl-5">
              {tabContent[activeTab].features.map((feature, index) => (
                <li key={index} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
