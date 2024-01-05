import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { Input } from "./ui/input";
import { NavItems } from "./NavItems";
import { MapPin, SearchIcon } from "lucide-react";
import { MainNav } from "./Categories";
import { SearchSuggestion } from "./SearchSuggestion";
import { useEffect, useRef, useState } from "react";
import { useSearchSuggestion } from "./hooks/useData";
import { useOnClickOutside } from "./hooks/use-on-click-outside.ts";
import { addressStore } from "./hooks/useStore";
import { Button } from "./ui/button";
import { getSession } from "next-auth/react";
import { useCart } from "./hooks/useCart";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch, isLoading } = useSearchSuggestion(searchQuery);

  const handleOpen = () => {
    refetch();
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => close());

  return (
    <div className="bg-primary sticky z-50 top-0 inset-x-0 ">
      <header className="relative bg-primary w-full">
        <MaxWidthWrapper>
          <div className="flex items-center h-20 gap-7 ">
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <Icons.logo className="h-16 w-72" />
              </Link>
            </div>
            <div className="w-full relative" ref={navRef}>
              <Input
                placeholder="Search for products..."
                className="w-full rounded-lg h-10 ps-10"
                onClick={() => handleOpen()}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute inset-y-0 start-0 my-auto ms-3 w-5 h-5 text-slate-500" />
              <SearchSuggestion
                open={open}
                data={data}
                isLoading={isLoading}
                close={close}
              />
            </div>
            <NavItems />
          </div>
        </MaxWidthWrapper>
        <MainNav />
        <AddressBar />
      </header>
    </div>
  );
};

const AddressBar = () => {
  const { store } = useCart();
  const { currentAddress, setCurrentAddress } = addressStore();

  const topAlertMessage = store.auth.config?.WEB_TOP_HEADER.text;

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session && session?.user.addresses.length > 0) {
        if (session?.user.selected_address) {
          setCurrentAddress(session?.user.selected_address);
        } else {
          setCurrentAddress(session?.user.addresses[0]);
        }
      }
    }
    checkSession();
  }, []);

  return (
    <div className="bg-pink-700 w-full  ">
      <MaxWidthWrapper className="flex items-center justify-between h-7">
        <div>
          <p className="text-sm text-white">{topAlertMessage ?? ""} </p>
        </div>

        <div className="flex items-center gap-x-4 ">
          <div className="flex items-center gap-x-1 mt-0.5">
            <p className="text-white font-semibold text-xs">DELIVER TO:</p>
            <p className="text-white  text-xs">
              {currentAddress?.google_address ?? "Dubai, United Arab Emirates"}
            </p>
          </div>
          <Button
            className="bg-white hover:bg-white text-pink-800 h-6 text-xs rounded-[3px] gap-x-1 px-1.5 "
            size={"sm"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 fill-pink-800 mb-0.5"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="">CHANGE</span>
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
