import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { useCartActions } from "./hooks/useCartActions";
import { useCart } from "./hooks/useCart";
import { getPayLoadData } from "@/lib/utils";

const AddToCartButton = ({ id }: { id: string }) => {
  const { store } = useCart();

  const cartItems = store.cart.cart?.cart_data.items ?? [];

  const { addToCart } = useCartActions(
    getPayLoadData(id, 1, cartItems?.length)
  );

  return (
    <Button
      size={"sm"}
      onClick={() => {
        addToCart();
      }}
      className="h-8"
    >
      <Icons.addToCart className="w-4 h-4 me-2" /> ADD
    </Button>
  );
};

export default AddToCartButton;
