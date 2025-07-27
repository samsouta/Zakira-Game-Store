import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FormData } from '../../types/auth';

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email?: string;
    phone_number?: string;
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

  }),
});

export const { useRegisterMutation, useLoginMutation, useLogOutMutation, useResetPasswordPhoneMutation } = authApi;
