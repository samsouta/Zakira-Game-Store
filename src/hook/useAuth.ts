// hooks/useAuth.ts
import Cookies from 'js-cookie';
import { useGetUserByIdQuery } from '../services/API/Auth';
import { useEffect } from 'react';

export function useAuth() {
  const token = Cookies.get('token');
  const userStr = Cookies.get('user');
  const cachedUser = userStr ? JSON.parse(userStr) : null;
  const { data: userData, isSuccess } = useGetUserByIdQuery(
    { id: cachedUser?.id, token: token || '' },
    { skip: !cachedUser?.id || !token }
  );

  useEffect(() => {
    if (isSuccess && userData?.data) {
      Cookies.set('user', JSON.stringify(userData?.data));
    }
  }, [isSuccess, userData]);

  const finalUser = userData?.data || cachedUser;
  return {
    isAuthenticated: !!token && !!finalUser,
    user: finalUser,
  };
}
