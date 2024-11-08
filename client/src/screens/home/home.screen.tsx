import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { PlusCircleIcon, LayoutGridIcon, LayoutListIcon } from 'lucide-react';

import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { useGetAllCampaignsQuery } from '@/services/campaign.service';
import { Hero } from './hero.component';
import { CampaignCard } from './campaign-card.component';
import { Campaign } from './types';
import { CampaignList } from './campaign-list.component';
import { CampaignCardSkeleton } from './campaign-card.component';
import { CampaignListSkeleton } from './campaign-list.component';

export const HomeScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: allCampaigns, isLoading, isError, error } = useGetAllCampaignsQuery();

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-0">
      <Hero />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Available Campaigns</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex">
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
          </div>
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
        {isLoading ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <CampaignCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <ul>
              {[...Array(6)].map((_, index) => (
                <CampaignListSkeleton key={index} />
              ))}
            </ul>
          )
        ) : isError ? (
          <div>Error: {error?.toString()}</div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCampaigns?.map((campaign: Campaign) => (
                  <CampaignCard key={campaign?._id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <ul>
                {allCampaigns?.map((campaign: Campaign) => (
                  <CampaignList key={campaign?._id} campaign={campaign} />
                ))}
              </ul>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};
