import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { useSelector } from 'react-redux';
import type { RootState } from '../../services/store';

interface OrderGuardProps {
  children: React.ReactElement;
}

export default function OrderGuard({ children }: OrderGuardProps) {
  const { isAuthenticated } = useAuth();
  const order = useSelector((state: RootState) => state.order?.orderData);

  // If not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no order found
  if (!order) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
