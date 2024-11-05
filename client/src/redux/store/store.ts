import { campaignApi } from '@/services/campaign.service';
import { submissionApi } from '@/services/submission.service';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/authSlice';

export const store = configureStore({
  reducer: {
    [campaignApi.reducerPath]: campaignApi.reducer,
    [submissionApi.reducerPath]: submissionApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
      },
    }).concat(campaignApi.middleware, submissionApi.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
