import { auth } from '@/lib/firebase';

export const getBaseUrl = () => {
  if (import.meta.env.VITE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  return 'https://like-money-backend.onrender.com';
};

export const getBearerToken = () => {
  let cachedToken: string | null = null;
  auth.onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken().then((token) => {
        cachedToken = token;
      });
    } else {
      cachedToken = null;
    }
  });
};
