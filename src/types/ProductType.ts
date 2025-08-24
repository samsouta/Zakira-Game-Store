import type { ServicesType } from "./servicesType";

export type ProductData = {
  id: number;
  game_id: number;
  service_id: number;
  product_type: string;
  name: string;
  description: string;
  img_url: string;
  preview_img: string[];
  price: string;
  fake_price: string;
  is_sold: boolean;
  is_popular: boolean,
  data: {
    rank: string;
    hero_count: number;
    skin_count: number;
    amount: number;
  };
  discount_percent: number;
  game : GameType;
  service:ServicesType
}

export type PaginationData = {
  current_page: number;
  data: ProductData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: string[];
  next_page_url: string;
  prev_page_url: string;
  per_page: number;
  to: number;
  total: number;
}

export type ProductsResponse = {
  success: string;
  message: string;
  data: PaginationData;
}

export type GameType = {
  id: number;
  service_id: number;
  slug: string;
  name: string;
  logo_url: string;
  is_hot: boolean;
  created_at: string;
  updated_at: string;
  products: ProductData[]
  service: ServicesType;
}

export type GameResponse = {
  success: boolean;
  message: string;
  data: GameType[];
  
}
