import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GameResponse, ProductsResponse } from '../../types/ProductType';

const BaseUrl = import.meta.env.VITE_API_BASE;


export const ProductsAPI = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ['product'],
  endpoints: (builder) => ({
    /**
     * Get all Products
     */
    getProducts: builder.query<ProductsResponse, { page?: number; service_id?: number; }>({
      query: ({ page = 1, service_id }) => {
        const params = new URLSearchParams();

        params.append('page', page.toString());
        if (service_id) params.append('service_id', service_id.toString());

        return {
          url: `products?${params.toString()}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      providesTags: ['product'],
    }),



    /**
     * Get Game Type 
     */
    getGamesType: builder.query<GameResponse, void>({
      query: () => ({
        url: `games`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['product'],
    }),

  }),
})
export const { useGetProductsQuery, useGetGamesTypeQuery } = ProductsAPI;
