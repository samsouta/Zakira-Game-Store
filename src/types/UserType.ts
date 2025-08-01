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