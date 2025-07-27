import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import Cookies from 'js-cookie';

interface UserGuardProps {
  children: React.ReactElement;
}

export default function UserGuard({ children }: UserGuardProps) {
  const { isAuthenticated } = useAuth();
  const Info = JSON.parse(Cookies.get('user') || '{}');
  const { username } = useParams();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If this route is using username (e.g. /:username)
  if (username && Info?.username !== username) {
    return <Navigate to="/404" replace />;
  }

  return children;
}
