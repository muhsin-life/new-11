import { Offer } from "@/types/cart";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "SAR" | "AED" | "OMR";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "AED", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function parseQuery(query: string) {
  return Object.fromEntries(new URLSearchParams(query).entries());
}

export const getPayLoadData: (
  id: string,
  qty: number,
  itemLength: number
) => PayloadProps = (id, qty, itemLength) => {
  if (itemLength > 0) {
    return {
      action: "update_items",
      data: {
        items: [
          {
            id,
            qty,
          },
        ],
        address_id: null,
      },
    };
  }
  return {
    data: {
      items: [
        {
          id,
          qty,
        },
      ],
      address_id: null,
    },
  };
};

export const getOfferLabel = (offers: Offer) => {
  const { type } = offers;
  // if (!offerData.value) {
  //   return offerData.label;
  // }
  switch (type) {
    case "flat_percentage_discount":
      return `FLAT ${offers?.value?.toFixed(0)}% OFF`;
    case "bxgy":
      return `BUY ${offers.xValue} GET ${offers.xValue} FREE`;
    default:
      return "";
  }
};
