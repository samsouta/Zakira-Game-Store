import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PromotionResponse } from '../../types/promotionType';

const BaseUrl = import.meta.env.VITE_API_BASE;


export const PromotionAPI = createApi({
    reducerPath: 'promotion',
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
    tagTypes: ['promotion'],
    endpoints: (builder) => ({


    /**
     * Get Active Promotion banner 
     */
        getActivePromotion: builder.query<PromotionResponse, void>({
            query: () => {
                return {
                    url: `banner`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
            providesTags: ['promotion'],
        }),


    }),
})
export const { useGetActivePromotionQuery } = PromotionAPI;
