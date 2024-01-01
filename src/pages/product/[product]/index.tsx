import { Breadcrumbs } from "@/components/BreadCrumb";
import { Icons } from "@/components/Icons";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useProduct } from "@/components/hooks/useData";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import getProduct from "@/helpers/api/getProduct";
import { getPriceDataByLocale } from "@/helpers/general";
import { cn, formatPrice } from "@/lib/utils";
import { SingleProductProps } from "@/types/product";
import { PriceElement } from "@/types/products";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Check, MinusIcon, PlusIcon, Shield, Star } from "lucide-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import type SwiperType from "swiper";
import { Pagination, Thumbs } from "swiper/modules";
import { SERVICES } from "@/config";
import { Progress } from "@/components/ui/progress";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { ProductGrid } from "@/components/ProductGrid";

interface ProductPageProps {
  slug: string;
  locale: locale;
}

export default function Page({ slug, locale }: ProductPageProps) {
  const { data, refetch, isLoading } = useProduct(slug, locale);
  const [swiper, setSwiper] = useState<SwiperType>();

  const product = data?.data.product;
  const productRating = data?.data.product_rating;
  const productReviews = data?.data.product_reviews;
  const relatedProducts = data?.data.related_products;

  // console.log(productRating);

  const validUrls = product
    ? product?.images.gallery_images && product.images.gallery_images.length > 0
      ? product.images.gallery_images.map(({ image }) => image)
      : [product?.images.featured_image]
    : ["https://www.lifepharmacy.com/images/page-header-bg.jpg"];

  const priceData = getPriceDataByLocale(
    locale as locale,
    product?.prices as PriceElement[]
  );

  const totalRatings = Object.values(
    productRating?.rating_details ?? {}
  ).reduce((acc, value) => acc + value, 0);

  const ratingPercentage = (rating: number | undefined) => {
    if (rating) {
      return (rating / totalRatings) * 100;
    }
    return 0;
  };

  return (
    data && (
      <MaxWidthWrapper className="bg-white">
        <Breadcrumbs
          segments={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Products",
              href: "/",
            },
          ]}
        />
        <div className="bg-white">
          <div className="grid grid-cols-12 lg:gap-x-8">
            {/* Product Details */}
            <div className="col-span-9">
              <div className="grid grid-cols-2 gap-x-5">
                <div className="mt-7">
                  <div className="aspect-square rounded-lg">
                    <ImageSlider urls={validUrls} swiperThumbs={swiper} />
                  </div>
                  <div className="mt-2 flex justify-center">
                    <Swiper
                      pagination={{
                        dynamicBullets: true,
                        renderBullet: (_, className) => {
                          return `<span class="rounded-full transition ${className}"></span>`;
                        },
                      }}
                      onSwiper={(swiper) => setSwiper(swiper)}
                      spaceBetween={10}
                      modules={[Pagination, Thumbs]}
                      slidesPerView={4}
                      className="h-full "
                    >
                      {product?.images.gallery_images?.map((image, i) => (
                        <SwiperSlide key={i} className="!w-fit">
                          <Image
                            src={image.medium}
                            height={90}
                            width={90}
                            alt={i.toString()}
                            className="rounded-lg border"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                <div className="">
                  <div className="mt-4 flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {product?.title}
                    </h1>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5 items-center">
                        {Array(parseInt(product?.rating ?? "0")).fill(
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        )}
                        {Array(5 - parseInt(product?.rating ?? "0")).fill(
                          <Star className="w-4 h-4 fill-white text-amber-500" />
                        )}
                      </div>
                      <p className="text-slate-600 text-sm ">
                        {productRating?.rating} - (
                        {productRating?.number_of_reviews} reviews)
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1  line-clamp-1">
                      {product?.categories?.map((cat) => (
                        <Link
                          href="/"
                          className={cn(
                            buttonVariants({
                              variant: "secondary",
                              size: "sm",
                            }),
                            " text-xs py-0.5 h-7"
                          )}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <section className="mt-4">
                    <div className="flex items-center">
                      {product?.sale_price &&
                      product?.sale_price !== product.filter_price ? (
                        <div className="flex items-center gap-3 mt-1 line-clamp-1">
                          <p className=" font-medium text-lg text-red-600">
                            {formatPrice(product?.sale_price)}
                          </p>
                          <p className=" font-medium text-sm text-blue-600 line-through">
                            {formatPrice(product.filter_price || "")}
                          </p>
                        </div>
                      ) : (
                        priceData && (
                          <div className=" mt-1 line-clamp-1">
                            <p className=" font-medium  text-red-600">
                              {formatPrice(priceData.price.regular_price)}
                            </p>
                          </div>
                        )
                      )}

                      <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4 font-semibold text-xs mt-2">
                        SKU : {product?.sku}
                      </div>
                    </div>
                    {product?.brand.images.logo ? (
                      <div className="flex items-center mt-2">
                        <Link href={`/brand/${product.brand.slug}`}>
                          <Image
                            src={product?.brand.images.logo}
                            height={55}
                            width={55}
                            alt={product.brand.name}
                            className="border rounded-xl hover:shadow transition"
                          />
                        </Link>
                      </div>
                    ) : null}

                    <div className="mt-4 space-y-6">
                      <Separator />

                      <div
                        className="text-sm text-slate-700"
                        dangerouslySetInnerHTML={{
                          __html: product?.short_description ?? "",
                        }}
                      />
                    </div>
                    <div className="mt-4 space-y-6">
                      <Separator />

                      <div className="flex items-center gap-3">
                        <div className="flex gap-2 items-center">
                          <Button
                            size={"icon"}
                            variant={"outline"}
                            className="border-primary"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                          <p className="mx-1">1</p>
                          <Button size={"icon"}>
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button className="w-full">
                          <Icons.addToCart className="w-5 h-5 me-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* <div className="mt-6 flex items-center">
                  <Check
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                  />
                  <p className="ml-2 text-sm text-muted-foreground">
                    Eligible for instant delivery
                  </p>
                </div> */}
                  </section>
                </div>
              </div>
            </div>

            <div className="mt-4 border-l col-span-3 px-4">
              <div className="flex flex-col gap-3">
                {" "}
                {SERVICES.map((service) => (
                  <div>
                    <div className="flex gap-x-3 items-center mb-4">
                      <div className="bg-blue-50 rounded-full p-3 flex-shrink-0">
                        <Image
                          src={`https://www.lifepharmacy.com/images/svg/${service.img_slug}.svg`}
                          height={20}
                          width={20}
                          alt="gift"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-primary font-semibold text-sm">
                          {service.title}
                        </p>
                        <div>
                          <p className="text-slate-500 text-xs">
                            {service?.description}
                          </p>
                          {service?.image_src ? (
                            <Image
                              src={service?.image_src}
                              height={10}
                              width={170}
                              className=""
                              alt={service.title}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </div>

            {/* Product images */}

            {/* add to cart part */}
            {/* <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          </div>
          <div className="flex gap-x-8 w-full my-7">
            <Image
              src={
                "https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/1010sale/yes-23-ppb.png"
              }
              width={600}
              height={150}
              className="w-full rounded-xl shadow"
              alt="banner-1"
            />
            <Image
              src={
                "https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/prescription-ppb-1.png"
              }
              width={600}
              height={150}
              className="w-full rounded-xl shadow"
              alt="banner-1"
            />
          </div>
        </div>
        <div className="pb-6">
          <h5 className="mt-6 border-b pb-2 text-xl font-semibold text-primary tracking-tight">
            Overview
          </h5>
          <div
            className=" [&:not(:first-child)]:mt-2 text-sm"
            dangerouslySetInnerHTML={{
              __html: product?.short_description ?? "",
            }}
          />
          <h5 className="mt-6 border-b pb-2 text-xl font-semibold text-primary tracking-tight">
            Details
          </h5>
          <div
            className="[&:not(:first-child)]:mt-2 text-sm"
            dangerouslySetInnerHTML={{
              __html: product?.description ?? "",
            }}
          />
          <h3 className="mt-6 border-b pb-2 text-xl font-semibold text-primary tracking-tight">
            More Info
          </h3>
          <div className="[&:not(:first-child)]:my-4 text-sm text-muted-foreground">
            <strong>SKU</strong> : {product?.sku}
          </div>

          <div className="border-b "></div>
          <div className="mt-5 grid grid-cols-12">
            <div className="col-span-4 flex flex-col gap-5 pr-10 border-r">
              <h4 className="text-xl font-semibold">Overall Rating</h4>
              <div className="flex flex-col gap-2">
                <h1 className="text-6xl font-semibold">{product?.rating}</h1>
                <div className="flex gap-0.5 items-center">
                  {Array(parseInt(product?.rating ?? "0")).fill(
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  )}
                  {Array(5 - parseInt(product?.rating ?? "0")).fill(
                    <Star className="w-5 h-5 fill-white text-amber-500" />
                  )}
                </div>
                <p className="text-muted-foreground">
                  Based on {productRating?.number_of_reviews} ratings
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-x-1 items-center w-10">
                      <p>{i + 1}</p>
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500 mb-0.5" />
                    </div>
                    <Progress
                      value={ratingPercentage(
                        productRating?.rating_details[i + 1]
                      )}
                      className="w-[100%]"
                    />
                    <p className="text-muted-foreground w-10">
                      {productRating?.rating_details[(i + 1).toString()]}
                    </p>
                  </div>
                )).reverse()}
              </div>
            </div>
            <div className="col-span-8 ps-5 overflow-y-auto h-[30rem]">
              <h4 className="  pb-3 text-xl font-semibold  tracking-tight">
                <span className="me-1">{productReviews?.length}</span> Customer
                Ratings
              </h4>
              {productReviews?.map((review) => (
                <div className="border-t py-5">
                  <div>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center justify-between">
                        <p className=" font-medium">{review.user.name}</p>
                        <p className="text-muted-foreground">{}</p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="text-green-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div className="flex gap-0.5 items-center mt-1">
                      {Array(review?.value).fill(
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      )}
                      {Array(5 - review?.value).fill(
                        <Star className="w-4 h-4 fill-white text-amber-500" />
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-sm italic">no comment</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t mt-5">
            <ProductGrid
              productGridProps={{
                title: "You May Also Like",
              }}
              products={{ data: relatedProducts, isLoading: isLoading }}
              supportedDeviceTypes={["desktop", "mobile"]}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    )
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
  params,
}) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["get-product", params?.product, locale],
    queryFn: async () => {
      const data = await getProduct({
        slug: params?.product as string,
        locale: locale as locale,
      });
      return data as SingleProductProps;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug: params?.product,
      locale: locale as locale,
    },
  };
};
