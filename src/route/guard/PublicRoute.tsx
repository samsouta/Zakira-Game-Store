// routes/GuestRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

interface PublicRouteProps {
  children: React.ReactElement;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
