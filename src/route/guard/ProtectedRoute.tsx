// routes/ProtectedRoute.tsx
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { useSelector } from 'react-redux';
import type { RootState } from '../../services/store';

interface ProtectedRouteProps {
  children: React.ReactElement;
  adminOnly?: boolean;
  userOnly?: boolean;
  requireOrder?: boolean;
  matchUsername?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
  userOnly = false,
  requireOrder = false,
  matchUsername = false
}: ProtectedRouteProps) {
  const {  user } = useAuth();
  const { username } = useParams();
  const order = useSelector((state: RootState) => state.order?.orderData);


  const isAdmin = user?.is_admin === true;

  // ❌ Block banned users
  if (user?.is_banned) {
    return <Navigate to="/banned" replace />;
  }
  
  // ❌ Block normal users from admin-only routes
  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  // ❌ Block admins from user-only routes
  if (userOnly && isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // ❌ Require order for this page?
  if (requireOrder && !order) {
    return <Navigate to="/404" replace />;
  }

  // ❌ Check if username in URL matches current user
  if (matchUsername && username && user?.username !== username) {
    return <Navigate to="/404" replace />;
  }

  // ✅ Passed all checks
  return children;
}
