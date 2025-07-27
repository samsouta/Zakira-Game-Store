import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ServicesType } from '../../types/servicesType';

const BaseUrl = import.meta.env.VITE_API_BASE;

type ServicesResponse = {
  success: boolean;
  message: string;
  data: ServicesType[];
}

export const ServicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ['Services'],
  endpoints: (builder) => ({
    /**
     * Get all services
     */
    getServices: builder.query<ServicesResponse, void>({
      query: () => ({
        url: 'services',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Services'],
    }),
  }),
})
export const { useGetServicesQuery } = ServicesApi;
