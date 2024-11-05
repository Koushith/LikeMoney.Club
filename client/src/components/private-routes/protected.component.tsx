import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/authSlice';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};
