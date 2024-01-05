import { Address } from "@/types/session";
import { create } from "zustand";

interface addressProps {
  currentAddress: Address | null;
  setCurrentAddress: (currentAddress: Address | null) => void;
}

export const addressStore = create<addressProps>()((set) => ({
  currentAddress: null,
  setCurrentAddress: (currentAddress) => {
    set({ currentAddress });
  },
}));
