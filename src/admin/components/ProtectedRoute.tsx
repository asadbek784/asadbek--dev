import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/components/ui/Loader';

export default function ProtectedRoute() {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
