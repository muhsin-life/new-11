import { Cart, CartData, CartDetails } from "./cart";

export interface CartSuccessProps {
  success: boolean;
  message: string;
  data: CartDetails
}
