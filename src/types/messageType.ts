export type MessageResponse = {
  success: boolean;
  message: string;
  messages: {
    id: number;
    user_id: number;
    title: string;
    body: string;
    is_read: boolean;
    created_at: string
  }[];
};