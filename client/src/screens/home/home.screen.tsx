import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSignIcon, EyeIcon, TagIcon, PlusCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from 'react';
import { motion } from "framer-motion";
import { Users, Building, Zap } from "lucide-react";

// Update the Campaign interface to include an image URL
export interface Campaign {
    id: string;
    businessName: string;
    taggedBusiness: string;
    viewCount: number;
    budget: number;
    startDate: Date;
    endDate?: Date;
    zpkRequired: boolean;
    imageUrl: string;  // Add this line
}

// Components
interface CampaignCardProps {
    campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => (
    <Card className="overflow-hidden">
        <div className="relative w-full h-48">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500" />
            {campaign.imageUrl && (
                <img 
                    src={campaign.imageUrl} 
                    alt={campaign.businessName} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />
            )}
        </div>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{campaign.businessName}</CardTitle>
                <Avatar className="h-9 w-9">
                    <AvatarImage src={campaign.imageUrl} alt={campaign.businessName} />
                    <AvatarFallback>{campaign.businessName.slice(0, 2).toUpperCase()}</AvatarFallback>
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
                    <span className="text-sm">{campaign.viewCount} views</span>
                </div>
                <div className="flex items-center">
                    <DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">${campaign.budget}</span>
                </div>
                <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{campaign.startDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                        {campaign.endDate 
                            ? campaign.endDate.toLocaleDateString() 
                            : 'No end date'}
                    </span>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">Apply for Campaign</Button>
        </CardFooter>
    </Card>
);

interface CampaignListProps {
    campaigns: Campaign[];
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
    </div>
);

// New ProjectExplanation component
const ProjectExplanation: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'influencers' | 'businesses' | 'how'>('influencers');

    const tabContent = {
        influencers: {
            icon: <Users className="w-12 h-12 mb-4" />,
            title: "For Influencers",
            description: "Discover campaigns that align with your brand. Grow your audience and earn while doing what you love.",
            features: ["Match with relevant brands", "Easy application process", "Track campaign progress", "Secure payments"]
        },
        businesses: {
            icon: <Building className="w-12 h-12 mb-4" />,
            title: "For Businesses",
            description: "Connect with influencers who truly understand and represent your brand values.",
            features: ["Create targeted campaigns", "Access a diverse influencer pool", "Real-time campaign analytics", "Brand safety controls"]
        },
        how: {
            icon: <Zap className="w-12 h-12 mb-4" />,
            title: "How It Works",
            description: "Our platform makes influencer marketing simple, efficient, and effective.",
            features: ["Sign up and create your profile", "Browse or list campaigns", "Apply or approve collaborations", "Execute campaigns and track results"]
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-lg mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24 animate-pulse" />
            
            <h2 className="text-4xl font-bold mb-6 relative z-10">Welcome to CampaignConnect</h2>
            <p className="text-xl mb-8 max-w-2xl relative z-10">
                Bridging the gap between influential voices and innovative brands. 
                Discover, connect, and grow with CampaignConnect.
            </p>

            <div className="flex mb-6 relative z-10">
                {(['influencers', 'businesses', 'how'] as const).map((tab) => (
                    <Button
                        key={tab}
                        variant={activeTab === tab ? "secondary" : "ghost"}
                        onClick={() => setActiveTab(tab)}
                        className="mr-4"
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
                className="bg-white bg-opacity-20 p-6 rounded-lg relative z-10"
            >
                <div className="flex items-start">
                    <div className="mr-6">
                        {tabContent[activeTab].icon}
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">{tabContent[activeTab].title}</h3>
                        <p className="mb-4">{tabContent[activeTab].description}</p>
                        <ul className="list-disc pl-5">
                            {tabContent[activeTab].features.map((feature, index) => (
                                <li key={index} className="mb-2">{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>

            <Button className="mt-8 relative z-10" variant="secondary">Get Started</Button>
        </div>
    );
};

// Update the HomeScreen component
export const HomeScreen: React.FC = () => {
    // This would typically come from an API or state management
    const campaigns: Campaign[] = [
        {
            id: '1',
            businessName: 'TechGadgets Inc.',
            taggedBusiness: 'Electronics',
            viewCount: 1500,
            budget: 5000,
            startDate: new Date('2023-06-01'),
            endDate: new Date('2023-07-01'),
            zpkRequired: true,
            imageUrl: 'https://example.com/tech-gadgets-image.jpg',  // Add this line
        },
        {
            id: '2',
            businessName: 'FashionForward',
            taggedBusiness: 'Clothing',
            viewCount: 2000,
            budget: 3000,
            startDate: new Date('2023-06-15'),
            zpkRequired: false,
            imageUrl: 'https://example.com/fashion-forward-image.jpg',  // Add this line
        },
        // New mock campaigns
        {
            id: '3',
            businessName: 'GreenEats',
            taggedBusiness: 'Food & Beverage',
            viewCount: 3200,
            budget: 4500,
            startDate: new Date('2023-07-01'),
            endDate: new Date('2023-08-15'),
            zpkRequired: true,
            imageUrl: 'https://example.com/green-eats-image.jpg',
        },
        {
            id: '4',
            businessName: 'FitLife Gym',
            taggedBusiness: 'Fitness',
            viewCount: 1800,
            budget: 2500,
            startDate: new Date('2023-06-20'),
            zpkRequired: false,
            imageUrl: 'https://example.com/fitlife-gym-image.jpg',
        },
        {
            id: '5',
            businessName: 'TravelBug Adventures',
            taggedBusiness: 'Travel',
            viewCount: 4000,
            budget: 7000,
            startDate: new Date('2023-07-15'),
            endDate: new Date('2023-09-15'),
            zpkRequired: true,
            imageUrl: 'https://example.com/travelbug-adventures-image.jpg',
        },
        {
            id: '6',
            businessName: 'BeautyBliss',
            taggedBusiness: 'Cosmetics',
            viewCount: 2500,
            budget: 3500,
            startDate: new Date('2023-06-25'),
            zpkRequired: false,
            imageUrl: 'https://example.com/beauty-bliss-image.jpg',
        },
    ];

    const trendingCampaigns = campaigns.slice(0, 3); // Use the first 3 campaigns as trending

    return (
        <div className="container mx-auto py-8">
            <ProjectExplanation />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Available Campaigns</h1>
                <Button className="flex items-center">
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    List Campaign
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
        </div>
    );
};