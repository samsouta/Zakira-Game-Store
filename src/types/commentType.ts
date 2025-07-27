
export type CommentType = {
  id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    username: string;
  };
}
export type CommentResponse = {
  success: boolean;
  message: string;
  data: CommentType[];
};
