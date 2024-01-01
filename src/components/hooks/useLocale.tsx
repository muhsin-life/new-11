import { COUNTRIES, LANGUAGES } from "@/config";
import { useRouter } from "next/router";

export const useLocale = () => {
  const { locale } = useRouter();

  const CURRENT_COUNTRY_CODE = locale?.split("-")[0] as "ae" | "sa";
  const CURRENT_LANGUAGE_CODE = locale?.split("-")[1] as "en" | "ar";

  const SELECTED_LANGUAGE_DETAILS =
    CURRENT_LANGUAGE_CODE === "en" ? LANGUAGES[1] : LANGUAGES[0];
  const SELECTED_COUNTRY_DETAILS =
    CURRENT_COUNTRY_CODE === "ae" ? COUNTRIES[0] : COUNTRIES[1];

  return {
    SELECTED_LANGUAGE_DETAILS,
    SELECTED_COUNTRY_DETAILS,
  };
};
