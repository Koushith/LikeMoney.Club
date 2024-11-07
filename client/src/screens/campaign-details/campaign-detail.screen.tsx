import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGetCampaignByIdQuery } from '@/services/campaign.service';
import { CampaignDetailSkeleton } from './campagin-details-skeliton';
import { getBaseUrl } from '@/utils/helper';
import {
  useGetSubmissionsByCampaignIdQuery,
  useUpdateSubmissionByCampaignIdMutation,
} from '@/services/submission.service';

const mockProof = {
  fullName: 'Koushith Amin',
  username: 'koushith__',
  hashtags: [
    {
      x: 0.8888888888888881,
      y: 0.9376923150282641,
      width: 0.058184615384615,
      height: 0.022500000000000003,
      rotation: 0,
      hashtag: {
        name: 'test',
        id: '17841563557120538',
      },
      id: null,
    },
  ],
  viewerCount: 2,
};

const rawProof = {
  identifier: '0xd7960c525e1413677c87415ce2b07084a2b1988d0ddc288a7a74c15623ef4612',
  claimData: {
    provider: 'http',
    parameters:
      '{"additionalClientOptions":{},"body":"{{REQ_BODY_GRD}}","geoLocation":"","headers":{"Referer":"https://www.instagram.com/accounts/edit","Sec-Fetch-Mode":"same-origin","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 18_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1"},"method":"POST","paramValues":{"REQ_BODY_GRD":"av=17841407002361281&__d=www&__user=0&__a=1&__req=1a&__hs=20032.HYP%3Ainstagram_web_pkg.2.1..0.1&dpr=3&__ccg=UNKNOWN&__rev=1017946529&__s=ruwqw8%3Aelipdk%3Afzj6m5&__hsi=7433834680408571407&__dyn=7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0k24o1DU2_CwjE1EE2Cw8G11wBz81s8hwGxu786a3a1YwBgao6C0Mo2swaOfK0EUjwGzEaE2iwNwmE2eUlwhEe87q7U1mUdEGdwtUeo9UaQ0Lo6-3u2WE5B08-269wr86C1mgcEed6goK10xKi2K7E5yqcxK2K0Pay9rx66E&__csr=grjNQ8OhQDkQRqEzJWXP9-B9T97tlQBkZ8yAFft9Vbh7QGECWlQLhlRFajyuC9mjic8KuiqLl9GAQXBCWizUyENpGEExDDACxObxyU-SuGBCyEjm9JoyRLVELyvxLy9e8GGCXDoOi-aByo-boK5EjypFki8G6E01f89E2Ayo7C0ki0kFap3onw2c83IBxyzj01y60pC1s80qx02XpVRD4G0oLAGmbCxS5sE48GplEs1Iu1WwSiix53CZ0e-swC2OfwIo11ob8mAG15Oxy1LwiU3Cg8o3Zw080K0To0gBw&__comet_req=7&fb_dtsg=NAcOVYmtQiTFNPnVnGRFLrAlX47Dj5ewtDDZ5mjEZQOZsMFQh_shnaA%3A17843696212148243%3A1727436528&jazoest=26333&lsd=vrTl_kMdBLUiyVWxVEei-A&__spin_r=1017946529&__spin_b=trunk&__spin_t=1730824513&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisStoriesV3ReelPageStandaloneQuery&variables=%7B%22reel_ids_arr%22%3A%5B%226970249412%22%5D%7D&server_timestamps=true&doc_id=8499024106872104","ig_mention":"{\\"full_name\\":\\"Koushith Amin\\",\\"username\\":\\"koushith__\\"}","story_hashtags":"[{\\"x\\":0.8888888888888881,\\"y\\":0.9376923150282641,\\"width\\":0.058184615384615,\\"height\\":0.022500000000000003,\\"rotation\\":0.0,\\"hashtag\\":{\\"name\\":\\"test\\",\\"id\\":\\"17841563557120538\\"},\\"id\\":null}]","viewer_count":"0"},"responseMatches":[{"invert":false,"type":"contains","value":"\\"ig_mention\\":{{ig_mention}}"},{"invert":false,"type":"contains","value":"\\"story_hashtags\\":{{story_hashtags}}"},{"invert":false,"type":"contains","value":"\\"viewer_count\\":{{viewer_count}}"}],"responseRedactions":[{"jsonPath":"$.data.xdt_api__v1__feed__reels_media.reels_media[0].items[0].story_bloks_stickers[0].bloks_sticker.sticker_data.ig_mention","regex":"\\"ig_mention\\":(.*)","xPath":""},{"jsonPath":"$.data.xdt_api__v1__feed__reels_media.reels_media[0].items[0].story_hashtags","regex":"\\"story_hashtags\\":(.*)","xPath":""},{"jsonPath":"$.data.xdt_api__v1__feed__reels_media.reels_media[0].items[0].viewer_count","regex":"\\"viewer_count\\":(.*)","xPath":""}],"url":"https://www.instagram.com/graphql/query"}',
    owner: '0x6132ffb18a12bd9a0e82df243c6c07e5db245664',
    timestampS: 1730824543,
    context:
      '{"contextAddress":"0x9ccCA0a968A9bc5916E0de43Ea2D68321655ae67","contextMessage":"User registration proof","extractedParameters":{"REQ_BODY_GRD":"av=17841407002361281&__d=www&__user=0&__a=1&__req=1a&__hs=20032.HYP%3Ainstagram_web_pkg.2.1..0.1&dpr=3&__ccg=UNKNOWN&__rev=1017946529&__s=ruwqw8%3Aelipdk%3Afzj6m5&__hsi=7433834680408571407&__dyn=7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0k24o1DU2_CwjE1EE2Cw8G11wBz81s8hwGxu786a3a1YwBgao6C0Mo2swaOfK0EUjwGzEaE2iwNwmE2eUlwhEe87q7U1mUdEGdwtUeo9UaQ0Lo6-3u2WE5B08-269wr86C1mgcEed6goK10xKi2K7E5yqcxK2K0Pay9rx66E&__csr=grjNQ8OhQDkQRqEzJWXP9-B9T97tlQBkZ8yAFft9Vbh7QGECWlQLhlRFajyuC9mjic8KuiqLl9GAQXBCWizUyENpGEExDDACxObxyU-SuGBCyEjm9JoyRLVELyvxLy9e8GGCXDoOi-aByo-boK5EjypFki8G6E01f89E2Ayo7C0ki0kFap3onw2c83IBxyzj01y60pC1s80qx02XpVRD4G0oLAGmbCxS5sE48GplEs1Iu1WwSiix53CZ0e-swC2OfwIo11ob8mAG15Oxy1LwiU3Cg8o3Zw080K0To0gBw&__comet_req=7&fb_dtsg=NAcOVYmtQiTFNPnVnGRFLrAlX47Dj5ewtDDZ5mjEZQOZsMFQh_shnaA%3A17843696212148243%3A1727436528&jazoest=26333&lsd=vrTl_kMdBLUiyVWxVEei-A&__spin_r=1017946529&__spin_b=trunk&__spin_t=1730824513&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisStoriesV3ReelPageStandaloneQuery&variables=%7B%22reel_ids_arr%22%3A%5B%226970249412%22%5D%7D&server_timestamps=true&doc_id=8499024106872104","ig_mention":"{\\"full_name\\":\\"Koushith Amin\\",\\"username\\":\\"koushith__\\"}","story_hashtags":"[{\\"x\\":0.8888888888888881,\\"y\\":0.9376923150282641,\\"width\\":0.058184615384615,\\"height\\":0.022500000000000003,\\"rotation\\":0.0,\\"hashtag\\":{\\"name\\":\\"test\\",\\"id\\":\\"17841563557120538\\"},\\"id\\":null}]","viewer_count":"0"},"providerHash":"0xc58f049e259468165f920f3aa095db9fa7055e8f67ed9fe5754f5a7cf0ded349"}',
    identifier: '0xd7960c525e1413677c87415ce2b07084a2b1988d0ddc288a7a74c15623ef4612',
    epoch: 1,
  },
  signatures: [
    '0x768545e0cde33261e0c1f5baaafc6ce7cb2ca4fd77d4cd80b9e779655a8842a30bbfde86b5fe6b035e8ad2ac19c656050459085b6ad00a9ca621fc095abee0271b',
  ],
  witnesses: [
    {
      id: '0x244897572368eadf65bfbc5aec98d8e5443a9072',
      url: 'wss://witness.reclaimprotocol.org/ws',
    },
  ],
  publicData: {},
};

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ className, size = 24, ...props }) => {
  return (
    <div className={cn('animate-spin', className)} {...props}>
      <Loader2 size={size} />
    </div>
  );
};

const QRCodeContent = ({ requestUrl }: { requestUrl: string }) => (
  <div className="flex flex-col items-center space-y-6 p-6">
    <QRCode value={requestUrl} size={200} className="border-4 border-white rounded-lg shadow-lg" />
    <div className="flex flex-col items-center space-y-4">
      <Spinner className="h-8 w-8 text-primary" />
      <p className="text-sm text-muted-foreground text-center">Waiting for Reclaim proofs to be submitted..</p>
    </div>
  </div>
);

export const CampaignDetailScreen = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [requestUrl, setRequestUrl] = useState<string | null>(null);

  const { id } = useParams();
  console.log('id', id);

  const { data: campaignData, isLoading, isError } = useGetCampaignByIdQuery(id as string);

  const [updateSubmission, { isLoading: isUpdatingSubmission }] = useUpdateSubmissionByCampaignIdMutation();
  const { data: submissions, isLoading: isLoadingSubmissions } = useGetSubmissionsByCampaignIdQuery(id as string);
  console.log('submissions', submissions);
  if (isLoading) return <CampaignDetailSkeleton />;
  if (isError) return <div>Error fetching campaign details</div>;

  const campaign = campaignData?.campaign;

  const reclaimInitilizer = async () => {
    const response = await fetch(`${getBaseUrl()}/api/reclaim/initialize-reclaim`);
    const { reclaimProofRequestConfig } = await response.json();

    // Reconstruct the ReclaimProofRequest object
    const reclaimProofRequest = await ReclaimProofRequest.fromJsonString(reclaimProofRequestConfig);

    // Generate request URL and status URL
    const requestUrl = await reclaimProofRequest.getRequestUrl();
    const statusUrl = await reclaimProofRequest.getStatusUrl();

    setRequestUrl(requestUrl);
    //setStatusUrl(statusUrl);

    await reclaimProofRequest.startSession({
      onSuccess: async (proofs: any) => {
        console.log('Verification success', proofs);
        const { claimData } = proofs;
        const { extractedParameters } = JSON.parse(claimData.context);

        const fullName = JSON.parse(extractedParameters.ig_mention).full_name;
        const username = JSON.parse(extractedParameters.ig_mention).username;
        const hashtags = JSON.parse(extractedParameters.story_hashtags);
        const viewerCount = extractedParameters.viewer_count;

        const extractedProof = {
          fullName,
          username,
          hashtags,
          viewerCount,
        };

        const submission = await updateSubmission({
          campaignId: id as string,
          submission: {
            extractedProof,
            reclaimRawProof: proofs,
          },
        });

        console.log('submission', submission);
      },
      onError: (error: Error) => {
        console.error('Verification failed', error);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grow lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10"
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
              <img
                className="aspect-[3/2] rounded-lg shadow"
                src={campaign?.bannerImage ?? 'https://via.placeholder.com/300'}
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

              <div className="mt-2 flex items-center space-x-2 text-sm text-zinc-500">
                <div className="flex items-center">
                  <Calendar className="mr-2 w-4 h-4" />
                  <span>{campaign?.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'N/A'}</span>
                </div>
                <span>-</span>
                <div className="flex items-center">
                  <Calendar className="mr-2 w-4 h-4" />
                  <span>{campaign?.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
          {isDesktop ? (
            <Dialog>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={reclaimInitilizer}>Submit Your Proof</Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Scan QR Code to Submit Proof</DialogTitle>
                  <DialogDescription>Scan this QR code with your device to submit your proof.</DialogDescription>
                </DialogHeader>
                {requestUrl && (
                  <div>
                    <a href={requestUrl} target="_blank" rel="noopener noreferrer">
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button>Submit Your Proof----</Button>
                </motion.div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Scan QR Code to Submit Proof</DrawerTitle>
                  <DrawerDescription>Scan this QR code with your device to submit your proof.</DrawerDescription>
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
          {/* <div>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Total budget</div>
            <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">${campaign?.budget}</div>
            <div className="mt-3 text-sm/6 sm:text-xs/6">
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                +5.2%
              </span>
              <span className="text-zinc-500"> from last campaign</span>
            </div>
          </div> */}
          {/* <div>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Participants</div>
            <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{campaign?.submissions?.length || 0}</div>
            <div className="mt-3 text-sm/6 sm:text-xs/6">
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                +12.3%
              </span>
              <span className="text-zinc-500"> from last campaign</span>
            </div>
          </div> */}
          {/* <div>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Total Views</div>
            <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">112,200</div>
            <div className="mt-3 text-sm/6 sm:text-xs/6">
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                +8.7%
              </span>
              <span className="text-zinc-500"> from last campaign</span>
            </div>
          </div> */}
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
                  {submissions?.map((submission: any, index: number) => (
                    <motion.tr
                      key={submission._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                      className="hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]"
                    >
                      <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                        {submission.user.username}
                      </td>
                      <td className="text-zinc-500 relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                        {submission.content.viewerCount}
                      </td>
                      <td className="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                        {submission.content.username}
                      </td>
                      <td className="text-right relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-1 sm:last:pr-1">
                        {new Date(submission.updatedAt).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Button
            onClick={() => {
              updateSubmission({
                campaignId: id as string,
                submission: {
                  extractedProof: mockProof,
                  reclaimRawProof: rawProof,
                },
              });
            }}
          >
            Submit Your Proof
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
