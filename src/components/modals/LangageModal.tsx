import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "../ui/button";
import { COUNTRIES, LANGUAGES } from "@/config";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { useLocale } from "../hooks/useLocale";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useRouter } from "next/router";

export const LanguageModal = NiceModal.create(() => {
  const modal = useModal();
  const { SELECTED_COUNTRY_DETAILS, SELECTED_LANGUAGE_DETAILS } = useLocale();

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const [tab, setTab] = useState({
    name: "country",
    countryCode: SELECTED_COUNTRY_DETAILS.code,
  });

  return (
    <AlertDialog open={modal.visible} onOpenChange={modal.hide}>
      <AlertDialogContent>
        <div className="flex flex-row justify-between items-center">
          {tab.name === "language" && (
            <Button
              variant={"ghost"}
              className={"a"}
              size={"icon"}
              onClick={() => setTab((prev) => ({ ...prev, name: "country" }))}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
          )}
          <h5 className="text-xl font-semibold">Select a {tab.name}</h5>

          <Button
            variant={"ghost"}
            className={"a"}
            size={"icon"}
            onClick={modal.hide}
          >
            <Cross1Icon />
          </Button>
        </div>

        <div className="relative">
          <div className="flex flex-col w-full gap-1.5">
            {tab.name === "country"
              ? COUNTRIES.map((country) => (
                  <Button
                    variant={
                      SELECTED_COUNTRY_DETAILS.code === country.code
                        ? "secondary"
                        : "outline"
                    }
                    size={"lg"}
                    onClick={() =>
                      setTab({
                        name: "language",
                        countryCode: country.code,
                      })
                    }
                    className="h-[3.3rem] relative justify-start"
                  >
                    <country.icon className="w-7 h-7 me-3" />
                    <h6 className="text-base"> {country.title}</h6>
                    <div className="absolute right-5 inset-y-0 flex items-center">
                      {SELECTED_COUNTRY_DETAILS.code === country.code ? (
                        <Badge className="h-5 bg-green-500">Selected</Badge>
                      ) : (
                        <ChevronRightIcon className="" />
                      )}
                    </div>
                  </Button>
                ))
              : LANGUAGES.map((language) => (
                  <Button
                    variant={
                      SELECTED_LANGUAGE_DETAILS.code === language.code
                        ? "secondary"
                        : "outline"
                    }
                    size={"lg"}
                    onClick={() =>
                      router
                        .push({ pathname, query }, asPath, {
                          locale: `${tab.countryCode}-${language.code}`,
                        })
                        .then(modal.hide)
                    }
                    className="h-[3.3rem] relative  justify-start"
                  >
                    <h6 className="text-sm"> {language.title}</h6>
                    <div className="absolute right-5 inset-y-0 flex items-center">
                      {SELECTED_COUNTRY_DETAILS.code === tab.countryCode &&
                      SELECTED_LANGUAGE_DETAILS.code === language.code ? (
                        <Badge className="h-5 bg-green-500">Selected</Badge>
                      ) : (
                        <ChevronRightIcon className="" />
                      )}
                    </div>
                  </Button>
                ))}
          </div>
        </div>

        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
});
