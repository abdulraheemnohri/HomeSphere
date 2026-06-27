/**
 * Protected Route Component
 * Wraps routes that require authentication
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated } from '@/store';

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = '/login' }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
