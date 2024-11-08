import { campaignApi } from '@/services/campaign.service';
import { submissionApi } from '@/services/submission.service';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/authSlice';
import { authService } from '@/services/auth.service';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // Only auth will be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  [campaignApi.reducerPath]: campaignApi.reducer,
  [submissionApi.reducerPath]: submissionApi.reducer,
  [authService.reducerPath]: authService.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(campaignApi.middleware, submissionApi.middleware, authService.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
