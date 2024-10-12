export const getBaseUrl = () => {
  if (import.meta.env.VITE_ENV === "development") {
    return "http://localhost:8000";
  }
  return "https://like-money-backend.onrender.com";
};