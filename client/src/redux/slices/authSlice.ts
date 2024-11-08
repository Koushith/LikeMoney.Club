import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store/store';

interface AuthState {
  user: {
    _id?: string;
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    accessToken: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setAuthData: (state, action: PayloadAction<{ user: AuthState['user']; accessToken: string }>) => {
      if (action.payload.user) {
        state.user = {
          ...action.payload.user,
          accessToken: action.payload.accessToken,
        };
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, setError, setAuthData, clearAuth } = authSlice.actions;
export default authSlice.reducer;

// selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
