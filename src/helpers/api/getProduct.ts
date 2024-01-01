import axios from "axios";

interface productProps {
  slug: string;
  locale: locale;
}
export default async function getProduct({ slug, locale }: productProps) {
  const { data } = await axios.get(
    `https://prodapp.lifepharmacy.com/api/web/products/details?new_method=true&product_slug=${slug}&lang=${locale}`
  );
  return data ;
}
