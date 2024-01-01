import { useCart } from "./useCart";
import { useCreateCart } from "./useData";

export const useCartActions = (payload: PayloadProps) => {
  const { data, isLoading, isSuccess, refetch } = useCreateCart(payload);

  const { addItem } = useCart();
  const addToCart = () => {
    refetch().then((res) => {
      if (res.isSuccess) {
        addItem(res.data.data);
      }
    });
  };

  return {
    addToCart,
  };
};
