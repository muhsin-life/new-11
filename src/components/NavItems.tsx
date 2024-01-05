import { useSession } from "next-auth/react";
import { Icons } from "./Icons";
import { Modals } from "./modals/modals";

export const NavItems = () => {
  const { data: session } = useSession();
  type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

  const NAVBAR_ITEMS = [
    {
      label: "Arabic",
      value: "current_lang" as const,
      icon: Icons.aeFlag,
      buttonProps: {
        onClick: () => {
          Modals.show("language-modal");
        },
      } as ButtonProps,
    },
    {
      label: "Log in",
      value: "account" as const,
      icon: Icons.account,
      buttonProps: {
        onClick: () => {
          if (!session) {
            Modals.show("auth-modal");
          } else {
            Modals.show("account-dashboard");
          }
        },
      } as ButtonProps,
    },
    {
      label: "Wishlist",
      value: "wishlist" as const,
      icon: Icons.wishlist,
      buttonProps: {} as ButtonProps,
    },
    {
      label: "Cart",
      value: "cart" as const,
      icon: Icons.cart,
      buttonProps: {
        onClick: () => {
          Modals.show("cart");
        },
      } as ButtonProps,
    },
  ];

  return (
    <div className=" items-center xl:flex hidden">
      {NAVBAR_ITEMS.map((navItem, indx) => (
        <div className="flex items-center justify-center flex-shrink-0">
          <button
            className="flex items-center hover:bg-blue-900 p-2 rounded-lg"
            {...navItem.buttonProps}
          >
            <p className="text-white text-xs font-semibold">{navItem.label}</p>
            <navItem.icon className="w-5 h-5 ms-1.5 text-white" />
          </button>
          {indx !== NAVBAR_ITEMS.length - 1 && (
            <span className="h-6 w-px mx-2 bg-gray-400" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
};
