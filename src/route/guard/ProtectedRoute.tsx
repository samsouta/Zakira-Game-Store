// routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
