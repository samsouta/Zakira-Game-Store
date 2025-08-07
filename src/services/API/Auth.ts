import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AdminResponse, FormData } from '../../types/auth';
import type { UserResponse } from '../../types/UserType';

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    email?: string;
    phone_number?: string;
    is_admin: number;
    is_online: number;
    wallet_amount: string;
    is_banned: number;
    ban_reason: string | null;
    email_verified_at: string | null;
  };
}



const BaseUrl = import.meta.env.VITE_API_BASE;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    /**
     * Register a new user
     */
    register: builder.mutation<AuthResponse, FormData>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Auth'],
    }),
    /**
     * Login a user
     */
    login: builder.mutation<AuthResponse, FormData>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Auth'],
    }),

    /**
     * Logout a user
     */
    logOut: builder.mutation<AuthResponse, string>({
      query: (token) => ({
        url: `logout`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Auth'], // Invalidate auth-related cache
    }),

    /**
     * Reset password with phone number
     */
    resetPasswordPhone: builder.mutation<AuthResponse, FormData>({
      query: (data) => ({
        url: `reset-password-phone`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      }),
      invalidatesTags: ['Auth'], // Invalidate auth-related cache
    }),

    /**
     * GET admin status
     */
    getAdminStatus: builder.query<AdminResponse, void>({
      query: () => ({
        url: `admin-status`,
        method: 'GET',
      }),
      providesTags: ['Auth'], // Provide auth-related cache tag
    }),

    /**
     * GET User By id
     */
    getUserById: builder.query<UserResponse, {id: number, token: string}>({
      query: ({id, token}) => ({
        url: `user/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      providesTags: ['Auth'],
    }),

  }),
});

export const { 
  useRegisterMutation, 
  useLoginMutation, 
  useLogOutMutation, 
  useResetPasswordPhoneMutation ,
  useGetAdminStatusQuery,
  useGetUserByIdQuery
} = authApi;
