import { useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  ClipboardList,
  Edit,
  Gem,
  Gift,
  Heart,
  LucideIcon,
  MapPin,
  Package2,
  Phone,
  PlusCircle,
  ScrollText,
  Trash2,
  Undo2,
  Wallet2,
} from "lucide-react";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";

export const AccountDashboard = NiceModal.create(() => {
  const libraries = useMemo(() => ["places"], []);

  const modal = useModal();
  const { data: session } = useSession();
  const addresses = session?.user.addresses ?? [];

  interface TabProps {
    title:
      | "Addresses"
      | "Buy It Again"
      | "Returns"
      | "Wallet"
      | "Wishlist"
      | "Appointments"
      | "Account"
      | "Select Location"
      | "Contact Us";
    icon?: LucideIcon;
    onClick?: () => void;
  }

  const [tab, setTab] = useState<TabProps["title"]>("Account");

  const DASHBOARD_ITEMS: TabProps[] = [
    {
      title: "Addresses",
      icon: MapPin,
      onClick: () => {
        setTab("Addresses");
      },
    },
    {
      title: "Buy It Again",
      icon: Package2,
      onClick: () => {
        setTab("Buy It Again");
      },
    },
    {
      title: "Returns",
      icon: Undo2,
      onClick: () => {
        setTab("Returns");
      },
    },
    {
      title: "Wallet",
      icon: Wallet2,
      onClick: () => {
        setTab("Wallet");
      },
    },
    {
      title: "Wishlist",
      icon: Heart,
      onClick: () => {
        setTab("Wishlist");
      },
    },
    {
      title: "Appointments",
      icon: ClipboardList,
      onClick: () => {
        setTab("Appointments");
      },
    },
    {
      title: "Contact Us",
      icon: Phone,
      onClick: () => {
        setTab("Contact Us");
      },
    },
  ];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  return (
    <Sheet open={modal.visible} onOpenChange={modal.hide}>
      <SheetContent className="flex w-full flex-col  sm:max-w-lg bg-slate-50">
        <SheetHeader className="space-y-2.5 pr-6 border-b pb-3">
          <SheetTitle className="flex items-center gap-2 relative capitalize">
            {tab}
          </SheetTitle>
        </SheetHeader>
        {tab === "Account" && (
          <>
            <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border     items-center w-full p-[16px] bg-cover">
              <div
                className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
                style={{
                  backgroundImage: 'url("/images/account/account-bg.png")',
                }}
              >
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 ">
                  <img
                    className="h-full w-full rounded-full"
                    src="/images/account/account-bg.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-14 flex flex-col items-center">
                <h4 className="text-xl font-semibold text-slate-700 ">
                  {session?.user.name}
                </h4>
              </div>
              <div className="flex items-center gap-10 overflow-x-auto mt-3">
                <div className="flex flex-col items-center gap-1  ">
                  <Button
                    className="  rounded-full border  h-16 w-16"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <ScrollText className="text-blue-600 w-8 h-8" />
                  </Button>

                  <p className="text-slate-700 font-semibold text-sm">Orders</p>
                </div>
                <div className="flex flex-col items-center gap-1  ">
                  <Button
                    className="  rounded-full border  h-16 w-16"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <Gift className="text-blue-600 w-8 h-8" />
                  </Button>
                  <p className="text-slate-700 font-semibold text-sm">
                    Vouchers
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1  ">
                  <Button
                    className="  rounded-full border  h-16 w-16"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <Gem className="text-blue-600 w-8 h-8" />
                  </Button>
                  <p className="text-slate-700 font-semibold text-sm">
                    Rewards
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-3 w-full">
              {DASHBOARD_ITEMS.map((item) => (
                <Button
                  variant={"outline"}
                  className="border-none gap-3 justify-start items-center rounded-xl h-full p-4 hover:text-blue-500 group"
                  onClick={item.onClick}
                >
                  {item.icon && (
                    <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-blue-500" />
                  )}
                  <span className="font-semibold">{item.title}</span>
                </Button>
              ))}
            </div>
          </>
        )}
        {tab === "Addresses" && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex flex-col ">
                <h5 className="text-lg font-semibold">Addresses</h5>
                <p className="text-sm text-muted-foreground">
                  All addresses added will be displayed here
                </p>
              </div>
              <Button
                size={"sm"}
                className="rounded-lg bg-blue-500 h-9"
                onClick={() => setTab("Select Location")}
              >
                <PlusCircle className="w-5 h-5 me-2" />
                <span> Add New</span>
              </Button>
            </div>
            <div className="flex flex-col   mt-1 overflow-x-hidden">
              {addresses.map((addr) => (
                <div className="flex flex-col p-2 rounded-lg bg-white  shadow mb-3">
                  <div className="flex items-center justify-between border-b pb-1.5">
                    <div className="flex gap-x-1.5 items-center">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <h6 className="font-semibold text-sm">{addr.type}</h6>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <Button
                        size={"icon"}
                        variant={"secondary"}
                        className="h-full w-full p-1.5"
                      >
                        <Edit className="text-muted-foreground w-4 h-4" />
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="h-full w-full p-1.5"
                      >
                        <Trash2 className="text-muted-foreground w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-full py-1.5">
                    <p className="text-sm text-muted-foreground">
                      {addr.google_address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Select Location" && (
          <div className="relative flex flex-col flex-1 rounded-lg">
            {isLoaded && (
              <GoogleMap
                options={{
                  disableDefaultUI: true,
                  clickableIcons: false,
                }}
                center={{
                  lat: 7.2905715,
                  lng: 80.6337262,
                }}
                mapContainerStyle={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "0.5rem",
                }}
                zoom={20}
              >
                <div className="absolute m-auto inset-0 w-fit h-fit z-[1]">
                  <Image
                    src={"/images/pin-map.png"}
                    height={"50"}
                    width={"50"}
                    alt="location-pin"
                    className="z-[1] "
                  />

                  <div className=" m-auto z-[1] w-fit -mt-[14px]">
                    <span className="relative flex h-5 w-5 ">
                      <span className="animate-ping absolute duration-1000 inline-flex h-full w-full rounded-full bg-black/30"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-black/50"></span>
                    </span>
                  </div>
                </div>
              </GoogleMap>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
});
