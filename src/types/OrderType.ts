import type { UploadRow } from "./FileType";
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


/**
 * Top UP Type 
 */
export type TopUpOrder = {
  id: number;
  user_id: number;
  amount: number;
  payment_method: string;
  upload_id: number;
  upload?: UploadRow;
  status: string;
  created_at: string;
  updated_at: string;
};
export type TopUpOrderResponse = {
  success: boolean;
  message: string;
  order?: TopUpOrder;
};
