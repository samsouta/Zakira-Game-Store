import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CommentResponse } from '../../types/commentType';

const BaseUrl = import.meta.env.VITE_API_BASE;


export const ReviewAPI = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ['review'],
  endpoints: (builder) => ({
    /**
     * Post Comment and Rating star
     */
    postComment: builder.mutation<CommentResponse, { user_id: number ,rating: number, comment: string}>({
      query: (body) => ({
        url: 'reviews',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['review'],
    }),

    /**
     * Show all comment
     */
    getAllComments: builder.query<CommentResponse, void>({
      query: () => ({
        url: 'reviews',
        method: 'GET',
      }),
      providesTags: ['review'],
    }),

 
  }),
})
export const { usePostCommentMutation , useGetAllCommentsQuery  } = ReviewAPI;
