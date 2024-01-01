import { CartDetails, Store } from "@/types/cart";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORE_DATA_INIT } from "@/config";

type CartState = {
  store: Store;
  addItem: (cart: CartDetails) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      store: { ...STORE_DATA_INIT },
      addItem: (cart) =>
        set((state) => {
          return {
            store: {
              ...state.store,
              cart: {
                ...state.store.cart,
                cart: { ...cart },
              },
            },
          };
        }),
      //   clearCart: () => set({ items: [] }),
    }),
    {
      name: "life-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface sidebarStateProps {
  sidebarState: boolean;
  setSidebarState: (sidebarState: boolean) => void;
}

export const useCartSidebarState = create<sidebarStateProps>()((set) => ({
  sidebarState: false,
  setSidebarState: (sidebarState: boolean) => set({ sidebarState }),
}));
