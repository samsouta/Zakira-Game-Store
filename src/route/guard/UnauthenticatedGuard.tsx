import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';


interface UnauthenticatedGuardProps {
  children: React.ReactElement;
}

export default function UnauthenticatedGuard({ children }: UnauthenticatedGuardProps) {
  const { isAuthenticated } = useAuth();

  // If not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
