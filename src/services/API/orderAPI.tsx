import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateOrderResponse, OrderResponse } from '../../types/OrderType';

const BaseUrl = import.meta.env.VITE_API_BASE;

interface MakeOrderRequest {
    orderId: number;
    gameId : string;
    serverId : string;
    token: string;
}

export const orderAPI = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ['order'],
  endpoints: (builder) => ({
    /**
     * Post order 
     */
    makeOrder: builder.mutation<CreateOrderResponse, MakeOrderRequest>({
      query: ({  orderId , gameId , serverId, token }) => ({
        url: 'order',
        method: 'POST',
        body: {
            product_id : orderId,
            game_uid: gameId,
            server_id : serverId
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      invalidatesTags: ['order'],
    }),

    /**
     * GET User Order 
     */
    getUserOrder: builder.query<OrderResponse, string>({
      query: (token) => ({
        url: `orders`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      providesTags: ['order']
    }),
  }),
});

export const { useMakeOrderMutation , useGetUserOrderQuery} = orderAPI;
