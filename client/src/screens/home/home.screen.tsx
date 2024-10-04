import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSignIcon, EyeIcon, TagIcon, PlusCircleIcon, LayoutGridIcon, LayoutListIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Users, Building, Zap } from "lucide-react";
import ProtoImg from "@/assets/proto.jpg";
import { useNavigate } from 'react-router-dom';

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

const backgroundImages = [
    ProtoImg,
    "https://proofofliving.in/static/media/banner-2.6ce411cc58eaf163b63a.avif",
    "https://framerusercontent.com/images/zoCYa3hQ3F2G4JtvWzpYa4yBNdA.png?scale-down-to=2048" // Coldplay image URL
];

const getRandomBackgroundImage = () => 
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
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
                        alt={campaign.businessName} 
                        className="absolute inset-0 w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-500/50 mix-blend-overlay" />
                </div>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{campaign.businessName}</CardTitle>
                        <Avatar className="h-9 w-9">
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
                    <Button onClick={() => navigate(`/campaign/${campaign.id}`)} className="w-full">View More Details</Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

const CampaignListItem: React.FC<CampaignCardProps> = ({ campaign }) => {
    const randomBackgroundImage = getRandomBackgroundImage();

    return (
        <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
        >
            <hr role="presentation" className="w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="flex items-center justify-between">
                <div className="flex gap-6 py-6">
                    <div className="w-32 shrink-0">
                        <img 
                            className="aspect-[3/2] rounded-lg shadow-sm" 
                            src={randomBackgroundImage} 
                            alt={campaign.businessName} 
                        />
                    </div>
                    <div className="space-y-1.5">
                        <div className="text-base/6 font-semibold">{campaign.businessName}</div>
                        <div className="text-xs/6 text-zinc-500">
                            {campaign.startDate.toLocaleDateString()} - {campaign.endDate ? campaign.endDate.toLocaleDateString() : 'No end date'} <span aria-hidden="true">·</span> {campaign.taggedBusiness}
                        </div>
                        <div className="text-xs/6 text-zinc-600">{campaign.viewCount} views</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant="secondary">{campaign.zpkRequired ? 'ZPK Required' : 'Open'}</Badge>
                    <Button variant="ghost" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                        </svg>
                    </Button>
                </div>
            </div>
        </motion.li>
    );
};

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
            
            <h2 className="text-4xl font-bold mb-6 relative z-10">Welcome to Like.Money</h2>
            <p className="text-xl mb-8 max-w-2xl relative z-10">
                Bridging the gap between influential voices and innovative brands. 
                Discover, connect, and grow with Like.Money.
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

const Pagination: React.FC<{ currentPage: number, totalPages: number, onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
            >
                Previous
            </Button>
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
            >
                Next
            </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                </p>
            </div>
            <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <Button
                            key={i}
                            onClick={() => onPageChange(i + 1)}
                            variant={currentPage === i + 1 ? "secondary" : "outline"}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </Button>
                </nav>
            </div>
        </div>
    </div>
);

// Update the HomeScreen component
export const HomeScreen: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const campaignsPerPage = 6;
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
            imageUrl: 'https://proofofliving.in/static/media/banner-2.6ce411cc58eaf163b63a.avif',
        },
        {
            id: '2',
            businessName: 'FashionForward',
            taggedBusiness: 'Clothing',
            viewCount: 2000,
            budget: 3000,
            startDate: new Date('2023-06-15'),
            zpkRequired: false,
            imageUrl: 'https://example.com/fashion-forward-image.jpg',
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
        {
            id: '7',
            businessName: 'TechGadgets Inc.',
            taggedBusiness: 'Electronics',
            viewCount: 1500,
            budget: 5000,
            startDate: new Date('2023-06-01'),
            endDate: new Date('2023-07-01'),
            zpkRequired: true,
            imageUrl: 'https://proofofliving.in/static/media/banner-2.6ce411cc58eaf163b63a.avif',
        },
        {
            id: '8',
            businessName: 'FashionForward',
            taggedBusiness: 'Clothing',
            viewCount: 2000,
            budget: 3000,
            startDate: new Date('2023-06-15'),
            zpkRequired: false,
            imageUrl: 'https://example.com/fashion-forward-image.jpg',
        },
        {
            id: '9',
            businessName: 'GreenEats',
            taggedBusiness: 'Food & Beverage',
            viewCount: 3200,
            budget: 4500,
            startDate: new Date('2023-07-01'),
            endDate: new Date('2023-08-15'),
            zpkRequired: true,
            imageUrl: 'https://example.com/green-eats-image.jpg',
        },
    ];

    const indexOfLastCampaign = currentPage * campaignsPerPage;
    const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
    const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
    const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-8">
            <ProjectExplanation />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Available Campaigns</h1>
                <div className="flex items-center gap-4">
                    <Button
                        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                    >
                        <LayoutGridIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                    >
                        <LayoutListIcon className="h-4 w-4" />
                    </Button>
                    <Button className="flex items-center" onClick={() => navigate('/campaign')}>
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        List Campaign
                    </Button>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentCampaigns.map(campaign => (
                            <CampaignCard key={campaign.id} campaign={campaign} />
                        ))}
                    </div>
                ) : (
                    <ul>
                        {currentCampaigns.map(campaign => (
                            <CampaignListItem key={campaign.id} campaign={campaign} />
                        ))}
                    </ul>
                )}
            </motion.div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
};