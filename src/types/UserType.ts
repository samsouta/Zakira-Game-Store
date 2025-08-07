export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  method: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  product_id: string;
  total_price: number;
  payment_status: 'completed' | 'pending' | 'failed';
  transaction: Transaction;
}

export interface UserData {
  username: string;
  phone_number: string;
}

export type UserType = {
  id: number;
  username: string;
  phone_number: string;
  email: string | null;
  is_admin: boolean;
  is_online: boolean;
  wallet_amount: string;
  is_banned: boolean;
  ban_reason: string | null;
  email_verified_at: string | null;
};


export type UserResponse = {
  success: boolean;
  message: string;
  data: UserType;
}