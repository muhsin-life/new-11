import { Product } from "./products";

export interface SingleProductProps {
  success: boolean;
  message: string;
  data: SingleProductData;
}

export interface SingleProductData {
  product: Product;
  related_products: Product[];
  product_rating: ProductRating;
  product_reviews: ProductReview[];
}

export interface ProductRating {
  rating: string;
  rating_details: { [key: string]: number };
  number_of_reviews: number;
}

export interface ProductReview {
  _id: string;
  entity: string;
  entity_id: string;
  value: number;
  user_id: number;
  review: null;
  tags: any[] | null;
  sub_order_id: number;
  is_anonymous: boolean;
  channel?: string;
  id: string;
  updated_at: Date;
  created_at: Date;
  user_details: UserDetails;
  user: User;
}

export interface User {
  id: number;
  name: null | string;
}

export interface UserDetails {
  name: string;
  photo: null | string;
}
