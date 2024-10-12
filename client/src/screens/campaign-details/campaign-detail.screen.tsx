import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import QRCode from "react-qr-code";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useMediaQuery } from '@/hooks/useMediaQuery';

const mockParticipants = [
    { id: 'P001', name: 'Alice Johnson', totalViews: '15,000', instaId: '@alice_j', proofDate: 'May 5, 2024' },
    { id: 'P002', name: 'Bob Smith', totalViews: '22,500', instaId: '@bob_smith', proofDate: 'May 6, 2024' },
    { id: 'P003', name: 'Charlie Brown', totalViews: '18,700', instaId: '@charlie_b', proofDate: 'May 7, 2024' },
    { id: 'P004', name: 'Diana Prince', totalViews: '30,200', instaId: '@diana_p', proofDate: 'May 8, 2024' },
    { id: 'P005', name: 'Ethan Hunt', totalViews: '25,800', instaId: '@ethan_hunt', proofDate: 'May 9, 2024' },
];

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ className, size = 24, ...props }) => {
  return (
    <div className={cn("animate-spin", className)} {...props}>
      <Loader2 size={size} />
    </div>
  );
};

const QRCodeContent = () => (
  <div className="flex flex-col items-center space-y-6 p-6">
    <QRCode value="https://example.com/submit-proof" size={200} className="border-4 border-white rounded-lg shadow-lg" />
    <div className="flex flex-col items-center space-y-4">
      <Spinner className="h-8 w-8 text-primary" />
      <p className="text-sm text-muted-foreground text-center">
        Waiting for Reclaim proofs to be submitted..
      </p>
    </div>
  </div>
);

export const CampaignDetailScreen = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10"
        >
            <div className="mx-auto max-w-6xl">
                <div className="max-lg:hidden">
                    <Link to="/campaigns" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
                        <ChevronLeft className="h-4 w-4" />
                        Campaigns
                    </Link>
                </div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-4 flex flex-wrap items-end justify-between gap-4"
                >
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="w-32 shrink-0">
                            <img className="aspect-[3/2] rounded-lg shadow" src="https://picsum.photos/seed/campaign/300/200" alt="Campaign Banner" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">Summer Fashion Showcase</h1>
                                <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">Active</span>
                            </div>
                            <div className="mt-2 text-sm/6 text-zinc-500">May 1, 2024 - June 30, 2024</div>
                        </div>
                    </div>
                    {isDesktop ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button>Submit Your Proof</Button>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Scan QR Code to Submit Proof</DialogTitle>
                            <DialogDescription>
                              Scan this QR code with your device to submit your proof.
                            </DialogDescription>
                          </DialogHeader>
                          <QRCodeContent />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Drawer>
                        <DrawerTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button>Submit Your Proof</Button>
                          </motion.div>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader className="text-left">
                            <DrawerTitle>Scan QR Code to Submit Proof</DrawerTitle>
                            <DrawerDescription>
                              Scan this QR code with your device to submit your proof.
                            </DrawerDescription>
                          </DrawerHeader>
                          <QRCodeContent />
                        </DrawerContent>
                      </Drawer>
                    )}
                </motion.div>
                
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-6 text-sm/6 text-zinc-500 dark:text-zinc-400"
                >
                    <p>Showcase the latest summer fashion trends on your Instagram. Create engaging content featuring our products and reach new audiences with your unique style.</p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-8 grid gap-8 sm:grid-cols-3"
                >
                    <div>
                        <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
                        <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Total budget</div>
                        <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">$50,000</div>
                        <div className="mt-3 text-sm/6 sm:text-xs/6">
                            <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">+5.2%</span>
                            <span className="text-zinc-500"> from last campaign</span>
                        </div>
                    </div>
                    <div>
                        <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
                        <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Participants</div>
                        <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">1,234</div>
                        <div className="mt-3 text-sm/6 sm:text-xs/6">
                            <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">+12.3%</span>
                            <span className="text-zinc-500"> from last campaign</span>
                        </div>
                    </div>
                    <div>
                        <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
                        <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Total Views</div>
                        <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">112,200</div>
                        <div className="mt-3 text-sm/6 sm:text-xs/6">
                            <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">+8.7%</span>
                            <span className="text-zinc-500"> from last campaign</span>
                        </div>
                    </div>
                </motion.div>
                
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-12 text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white"
                >
                    Recent participants
                </motion.h2>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flow-root"
                >
                    <div className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)] -mx-[--gutter] overflow-x-auto whitespace-nowrap">
                        <div className="inline-block min-w-full align-middle sm:px-[--gutter]">
                            <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
                                <thead className="text-zinc-500 dark:text-zinc-400">
                                    <tr>
                                        <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">Name</th>
                                        <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">Total Views</th>
                                        <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">Instagram ID</th>
                                        <th className="text-right border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">Proof Submission Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockParticipants.map((participant, index) => (
                                        <motion.tr
                                            key={participant.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                                            className="hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]"
                                        >
                                            <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                                                {participant.name}
                                            </td>
                                            <td className="text-zinc-500 relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                                                {participant.totalViews}
                                            </td>
                                            <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                                                {participant.instaId}
                                            </td>
                                            <td className="text-right relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                                                {participant.proofDate}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export const CampaignDetailSkeleton = () => {
    return (
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            <div className="mx-auto max-w-6xl">
                <div className="max-lg:hidden">
                    <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </div>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="w-32 h-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                        <div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                                <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                                <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                            </div>
                            <div className="mt-2 h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </div>
                
                <div className="mt-6 h-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>

                <div className="mt-8 grid gap-8 sm:grid-cols-3">
                    {[...Array(3)].map((_, index) => (
                        <div key={index}>
                            <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                            <div className="mt-6 h-6 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                            <div className="mt-3 h-8 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                            <div className="mt-3 h-4 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                <div className="mt-4 flow-root">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        {[...Array(4)].map((_, index) => (
                                            <th key={index} className="py-3.5 px-3 text-left">
                                                <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {[...Array(4)].map((_, colIndex) => (
                                                <td key={colIndex} className="whitespace-nowrap py-4 px-3">
                                                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};