import { getBaseUrl } from '@/utils/helper';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { createApi } from '@reduxjs/toolkit/query/react';

export const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseUrl()}/api/auth` }),

  tagTypes: ['Auth'],

  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (token) => ({
        url: '/',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useSignInMutation } = authService;
