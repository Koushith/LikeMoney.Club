import { RootState } from '@/redux/store/store';
import { Campaign } from '@/screens/home/types';
import { getBaseUrl, getBearerToken } from '@/utils/helper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/campaigns`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Campaigns'],
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<Campaign[], void>({
      //returns campaigns array
      query: () => '/',
      providesTags: ['Campaigns'],
    }),
    getCampaignById: builder.query<Campaign, string>({
      //returns campaign object
      query: (id) => `/${id}`,
      providesTags: ['Campaigns'],
    }),
    createCampaign: builder.mutation<Campaign, Partial<Campaign>>({
      query: (campaign) => ({
        url: '/',
        method: 'POST',
        body: campaign,
      }),
      invalidatesTags: ['Campaigns'],
    }),
    updateCampaignById: builder.mutation<Campaign, { id: string; campaign: Partial<Campaign | any> }>({
      query: ({ id, campaign }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: campaign,
      }),
      invalidatesTags: ['Campaigns'],
    }),
  }),
});

export const {
  useGetAllCampaignsQuery,
  useCreateCampaignMutation,
  useGetCampaignByIdQuery,
  useUpdateCampaignByIdMutation,
} = campaignApi;
