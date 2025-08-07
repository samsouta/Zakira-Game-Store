// routes/UserGuard.tsx
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

interface UserGuardProps {
  children: React.ReactElement;
}

export default function UserGuard({ children }: UserGuardProps) {
  const { isAuthenticated, user } = useAuth();
  const { username } = useParams();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.is_admin === true;

  // ❌ Block admin from accessing user-only route
  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ If this route has username param (e.g. /:username)
  if (username && user?.username !== username) {
    return <Navigate to="/404" replace />;
  }

  return children;
}
