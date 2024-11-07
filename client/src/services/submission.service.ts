import { getBaseUrl } from '@/utils/helper';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { createApi } from '@reduxjs/toolkit/query/react';

export const submissionApi = createApi({
  reducerPath: 'submission',
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseUrl()}/api` }),
  endpoints: (builder) => ({
    updateSubmissionByCampaignId: builder.mutation({
      query: ({ campaignId, submission }) => ({
        url: `/submission/${campaignId}`,
        method: 'PUT',
        body: submission,
      }),
    }),
    getSubmissionsByCampaignId: builder.query({
      query: (campaignId) => ({
        url: `/submission/${campaignId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useUpdateSubmissionByCampaignIdMutation, useGetSubmissionsByCampaignIdQuery } = submissionApi;
