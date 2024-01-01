import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductListingPage } from "@/components/ProductPageListing";
import { useProductListing } from "@/components/hooks/useData";
import getProductListing from "@/helpers/api/getProductListing";
import { BrandProListingProps } from "@/types/brand-product-listing";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import React, { useState } from "react";

interface PageProps {
  filters: string;
}

export default function ProductsListing({ filters }: PageProps) {
  const router = useRouter();

  const [query, setQuery] = useState(filters);

  const { data, refetch } = useProductListing(query, router.locale as locale);

  const filterType = router.query?.brands
    ? "brands"
    : router.query?.categories
    ? "categories"
    : router.query?.collections
    ? "collections"
    : "collections";

  const products = data?.data;

  const imageBannerUrl = products?.filters?.[filterType]?.[0]?.images?.banner;
  const description = products?.model_details?.short_description;
  const heading = products?.filters?.[filterType]?.[0]?.name ?? "Products";
  return (
    <div>
      <MaxWidthWrapper>
        <div className="flex flex-col">
          <ProductListingPage
            pageType="products"
            pageName={"Products"}
            data={{
              products: products?.products,
              breadCrumbs: {
                segments: [
                  {
                    title: "Home",
                    href: "/",
                  },
                  {
                    title: "Products",
                    href: "/products",
                  },
                  {
                    title: heading,
                    href: `#`,
                  },
                ],
              },
              imageBannerUrl,
              description,
              heading,
            }}
            queryProps={{ query, setQuery }}
            refetch={refetch}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["get-product-listing", stringify({ ...query })],
    queryFn: async () => {
      const data = await getProductListing({
        filters: stringify({ ...query }),
        locale: locale as locale,
      });
      return data as BrandProListingProps;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      filters: stringify({ ...query }),
    },
  };
};
