import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MessageResponse } from '../../types/messageType';

const BaseUrl = import.meta.env.VITE_API_BASE;


export const messageAPI = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ['message'],
  endpoints: (builder) => ({
    /**
     * get user message 
     */
    getMessage: builder.query<MessageResponse, { userId: number, token: string }>({
      query: ({ userId, token }) => ({
        url: `message/${userId}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      providesTags: ['message'],
    }),

    /**
     * Post message 
     */
    postMessage: builder.mutation<MessageResponse, { userId: number, token: string , data: {title : string , body : string }}>({
      query: ({ userId, token , data}) => ({
        url: `/messages/user/${userId}`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          title : data?.title ,
          body: data?.body 
        }
      }),
      invalidatesTags: ['message'],
    }),


    /**
     * Post Unread Message 
     * 
     */
    makeUnread: builder.mutation<MessageResponse, { messageId: number, token: string }>({
      query: ({ messageId, token }) => ({
        url: `/messages/${messageId}/read`,
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      invalidatesTags: ['message'],
    }),

    /**
     * Delete user message 
     */
    deleteMessage: builder.mutation<MessageResponse, { messageId: number, token: string }>({
      query: ({ messageId, token }) => ({
        url: `/messages/${messageId}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      invalidatesTags: ['message'],
    }),



  }),
})
export const { useGetMessageQuery, useMakeUnreadMutation , useDeleteMessageMutation , usePostMessageMutation } = messageAPI;
