import type { ProductData } from "./ProductType";

export type CreateOrderResponse = {
  success: boolean;
  message: string;
  order?: {
    orderable: any; // Type for the loaded relationship
  };
  credentials?: {
    email: string;
    email_password: string;
    game_password: string;
  };
};

export type OrderType = {
  id: number;
  user_id: number;
  product_id: number;
  total_price: string;
  payment_status: string;
  product: ProductData;
  created_at: string;
  meta: {
    game_uid: string;
    server_id: string;
    email: string;
    game_password: string;
    email_password: string;
  };
}

export type OrderResponse = {
  success: boolean;
  orders?: OrderType[];
};

export type UserMeta = {
  game_uid: string;
  server_id: string;
  email: string;
  game_password: string;
  email_password: string;
};
