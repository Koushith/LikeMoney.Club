import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  useGetCampaignByIdQuery,
  useUpdateCampaignByIdMutation,
} from "@/services/campaign.service";
import { CampaignDetailSkeleton } from "./campagin-details-skeliton";
import { getBaseUrl } from "@/utils/helper";

const mockParticipants = [
  {
    id: "P001",
    name: "Alice Johnson",
    totalViews: "15,000",
    instaId: "@alice_j",
    proofDate: "May 5, 2024",
  },
  {
    id: "P002",
    name: "Bob Smith",
    totalViews: "22,500",
    instaId: "@bob_smith",
    proofDate: "May 6, 2024",
  },
  {
    id: "P003",
    name: "Charlie Brown",
    totalViews: "18,700",
    instaId: "@charlie_b",
    proofDate: "May 7, 2024",
  },
  {
    id: "P004",
    name: "Diana Prince",
    totalViews: "30,200",
    instaId: "@diana_p",
    proofDate: "May 8, 2024",
  },
  {
    id: "P005",
    name: "Ethan Hunt",
    totalViews: "25,800",
    instaId: "@ethan_hunt",
    proofDate: "May 9, 2024",
  },
];

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size = 24,
  ...props
}) => {
  return (
    <div className={cn("animate-spin", className)} {...props}>
      <Loader2 size={size} />
    </div>
  );
};

const QRCodeContent = ({ requestUrl }: { requestUrl: string }) => (
  <div className="flex flex-col items-center space-y-6 p-6">
    <QRCode
      value={requestUrl}
      size={200}
      className="border-4 border-white rounded-lg shadow-lg"
    />
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
  const [requestUrl, setRequestUrl] = useState<string | null>(null);

  const { id } = useParams();

  const {
    data: campaignData,
    isLoading,
    isError,
  } = useGetCampaignByIdQuery(id as string);

  const [updateCampaign, { isLoading: isUpdating }] =
    useUpdateCampaignByIdMutation();

  if (isLoading) return <CampaignDetailSkeleton />;
  if (isError) return <div>Error fetching campaign details</div>;

  const campaign = campaignData?.campaign;

  const reclaimInitilizer = async () => {
    const response = await fetch(
      `${getBaseUrl()}/api/reclaim/initialize-reclaim`
    );
    const { reclaimProofRequestConfig } = await response.json();

    console.log("reclaimProofRequestConfig", reclaimProofRequestConfig);

    // Reconstruct the ReclaimProofRequest object
    const reclaimProofRequest = await ReclaimProofRequest.fromJsonString(
      reclaimProofRequestConfig
    );

    console.log("reclaimProofRequest- parsed", reclaimProofRequest);

    // Generate request URL and status URL
    const requestUrl = await reclaimProofRequest.getRequestUrl();
    const statusUrl = await reclaimProofRequest.getStatusUrl();

    setRequestUrl(requestUrl);
    //setStatusUrl(statusUrl);

    await reclaimProofRequest.startSession({
      onSuccess: async (proofs: any) => {
        console.log("Verification success", proofs);
        const { claimData } = proofs;
        const { extractedParameters } = JSON.parse(claimData.context);

        const fullName = JSON.parse(extractedParameters.ig_mention).full_name;
        const username = JSON.parse(extractedParameters.ig_mention).username;
        const hashtags = JSON.parse(extractedParameters.story_hashtags);
        const viewerCount = extractedParameters.viewer_count;

        console.log("Extracted data:", {
          fullName,
          username,
          hashtags,
          viewerCount,
        });

        // TODO: Handle the extracted data (e.g., update state, send to server, etc.)

        const updatedCampaign = await updateCampaign({
          id: id as string,
          campaign: {
            submissions: [
              {
                campaign: id as string,
                user: "67004fdeff27e63129bb908c" as string,
                content: "test" as string,

                fullName: fullName as string,
                username: username as string,
                hashtags: hashtags as string,
                viewCount: viewerCount as string,
                rawProof: JSON.stringify(proofs),
              },
            ],
          },
        });

        console.log("updatedCampaign", updatedCampaign);
      },
      onError: (error: Error) => {
        console.error("Verification failed", error);
      },
    });
  };

  // const reclaimInitilizer = async () => {
  //   const APP_ID = "0x624D6A92A5E75629c8352a8f105B7a222C7a6B6D";
  //   const PROVIDER_ID = "b00f9875-ed44-4e08-b820-458f25dc5493";
  //   const APP_SECRET =
  //     "0x35fc484587319846b796178eee283c1d4151098a1e5af395e4f0efd110f7b2c8";
  //   const reclaimProofRequest = await ReclaimProofRequest.init(
  //     APP_ID,
  //     APP_SECRET,
  //     PROVIDER_ID
  //   );

  //   const requestUrl = await reclaimProofRequest.getRequestUrl();
  //   console.log("Request URL:", requestUrl);
  //   // In a real application, you would typically redirect the user to this URL or display it as a QR code.
  //   const statusUrl = reclaimProofRequest.getStatusUrl();
  //   console.log("Status URL:", statusUrl);
  //   // Start Session and begin listening for proofs:
  //   await reclaimProofRequest.startSession({
  //     onSuccess: (proofs) => {
  //       console.log("Verification success", proofs);
  //     },
  //     onError: (error) => {
  //       console.error("Verification failed", error);
  //     },
  //   });
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grow lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-lg:hidden">
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
          >
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
              <img
                className="aspect-[3/2] rounded-lg shadow"
                src={campaign?.bannerImage ?? "https://via.placeholder.com/300"}
                alt="Campaign Banner"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                  {campaign?.name}
                </h1>
                <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                  Active
                </span>
              </div>
              <div className="mt-2 text-sm/6 text-zinc-500">
                {campaign?.startDate
                  ? new Date(campaign.startDate).toLocaleDateString()
                  : "N/A"}{" "}
                -{" "}
                {campaign?.endDate
                  ? new Date(campaign.endDate).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>
          {isDesktop ? (
            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={reclaimInitilizer}>Submit Your Proof</Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Scan QR Code to Submit Proof</DialogTitle>
                  <DialogDescription>
                    Scan this QR code with your device to submit your proof.
                  </DialogDescription>
                </DialogHeader>
                {requestUrl && (
                  <div>
                    <a
                      href={requestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Request URL
                    </a>
                    <QRCodeContent requestUrl={requestUrl} />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button>Submit Your Proof----</Button>
                </motion.div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Scan QR Code to Submit Proof</DrawerTitle>
                  <DrawerDescription>
                    Scan this QR code with your device to submit your proof.
                  </DrawerDescription>
                </DrawerHeader>
                <QRCodeContent requestUrl={requestUrl} />
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
          <p>{campaign?.description}</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 grid gap-8 sm:grid-cols-3"
        >
          <div>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
              Total budget
            </div>
            <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
              ${campaign?.budget}
            </div>
            <div className="mt-3 text-sm/6 sm:text-xs/6">
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                +5.2%
              </span>
              <span className="text-zinc-500"> from last campaign</span>
            </div>
          </div>
          <div>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
              Participants
            </div>
            <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
              {campaign?.submissions?.length || 0}
            </div>
            <div className="mt-3 text-sm/6 sm:text-xs/6">
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                +12.3%
              </span>
              <span className="text-zinc-500"> from last campaign</span>
            </div>
          </div>
          <div>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
              Total Views
            </div>
            <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
              112,200
            </div>
            <div className="mt-3 text-sm/6 sm:text-xs/6">
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                +8.7%
              </span>
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
                    <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                      Name
                    </th>
                    <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                      Total Views
                    </th>
                    <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                      Instagram ID
                    </th>
                    <th className="text-right border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">
                      Proof Submission Date
                    </th>
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
