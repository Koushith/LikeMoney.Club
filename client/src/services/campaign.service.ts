import { getBaseUrl } from '@/utils/helper'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const campaignApi = createApi({
    reducerPath: 'campaignApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${getBaseUrl()}/api/campaigns` }),
    endpoints: (builder) => ({
        getAllCampaigns: builder.query({
            query: () => '/',
        })

    })
})


export const { useGetAllCampaignsQuery } = campaignApi