// routes/BannedOnlyRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

export default function BannedOnlyRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();

  if (!user?.is_banned) {
    return <Navigate to="404" replace />;
  }

  return children;
}
