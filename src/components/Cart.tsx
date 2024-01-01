import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { cn, formatPrice, getOfferLabel } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./hooks/useCart";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { getPriceDataByLocale } from "@/helpers/general";
import { useRouter } from "next/router";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowRightIcon, BadgePercent, MapPin, Tag } from "lucide-react";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DELIVERY_OPTIONS } from "@/config";

export const Cart = NiceModal.create(() => {
  const modal = useModal();
  const { store } = useCart();
  const { locale } = useRouter();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [tab, setTab] = useState<"checkout" | "cart">("cart");
  const [isCouponActive, setCouponActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 1000);
  }, []);

  const cartItems = isMounted ? store.cart.cart?.cart_data.items ?? [] : [];
  const cartSummary = isMounted ? store.cart.cart?.cart_summary : null;
  const shipmentData = isMounted ? store.cart.cart?.shipment_data : [];

  // const cartTotal = items.reduce(
  //   (total, { product }) => total + product.price,
  //   0
  // )

  return (
    <Sheet open={modal.visible} onOpenChange={modal.hide}>
      {/* <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger> */}
      <SheetContent className="flex w-full flex-col  sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6 border-b pb-3">
          <SheetTitle className="flex items-center gap-2 relative capitalize">
            {tab}
            <div className="text-white bg-green-500 h-5 w-5 rounded-xl  text-xs flex items-center justify-center">
              {cartItems.length}
            </div>
          </SheetTitle>
        </SheetHeader>
        {tab === "cart" ? (
          cartItems.length > 0 ? (
            <>
              <ScrollArea className={"flex w-full flex-col gap-5 flex-1"}>
                {cartItems.map((cartItem) =>
                  cartItem.items.map((item) => {
                    const priceData = getPriceDataByLocale(
                      locale as locale,
                      item.prices
                    );

                    return (
                      <div className="space-y-3">
                        <div
                          className={cn(
                            "flex items-start justify-between gap-4"
                          )}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative aspect-square h-20 w-20 max-w-fit  overflow-hidden rounded-lg border">
                              {item?.featured_image ? (
                                <Image
                                  src={item?.featured_image}
                                  alt={item.title}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  fill
                                  className="absolute object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center bg-accent" />
                              )}
                            </div>

                            <div className="flex flex-col gap-y-1 self-start">
                              <span className="line-clamp-1 text-sm font-medium ">
                                {item.title}
                              </span>
                              {item.offers && (
                                <div className="bg-green-500 w-fit rounded text-xs py-0.5 px-2 text-white">
                                  {getOfferLabel(item.offers)}
                                </div>
                              )}
                              {priceData?.price &&
                              priceData?.price.regular_price !==
                                priceData?.price.offer_price ? (
                                <div className="flex items-center gap-3 mt-1 line-clamp-1">
                                  <p className=" font-medium  text-red-600">
                                    {formatPrice(priceData?.price.offer_price)}
                                  </p>
                                  <p className=" font-medium text-sm text-blue-600 line-through">
                                    {formatPrice(
                                      priceData?.price.regular_price || ""
                                    )}
                                  </p>
                                </div>
                              ) : (
                                <div className=" mt-1 line-clamp-1">
                                  <p className=" font-medium text-red-600">
                                    {formatPrice(
                                      priceData?.price.regular_price || ""
                                    )}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    );
                  })
                )}
              </ScrollArea>
              <div>
                <div className="border rounded-lg  p-3 flex flex-col gap-2">
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-x-2">
                      <Tag className="w-5 h-5" />
                      <h6 className="font-semibold">Coupons & Offers</h6>
                    </div>
                    <Button variant="ghost" size={"sm"}>
                      View All
                      <ArrowRightIcon
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                  <div className="border border-green-600 border-dashed rounded-lg bg-green-50/50 p-2 flex justify-between">
                    <div className="flex items-center gap-x-2">
                      <BadgePercent className="text-green-600" />
                    </div>
                    <Input
                      onChange={(e) =>
                        e.target.value.length > 0
                          ? setCouponActive(true)
                          : setCouponActive(false)
                      }
                      className="w-full bg-green-50/50 border-none text-base text-green-900 focus-visible:ring-0 focus-visible:ring-offset-0 h-6"
                      placeholder="Enter Coupon Code"
                    />
                    <button
                      className={cn(" font-semibold text-sm text-slate-400", {
                        "text-green-600": isCouponActive,
                      })}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
                <div className={cn("space-y-4  ")}>
                  <div />
                  <div className="space-y-1.5 text-sm font-medium">
                    <div className="flex">
                      <span className="flex-1">Order Total</span>
                      <span>{formatPrice(cartSummary?.total ?? 0)}</span>
                    </div>
                    <div className="flex text-green-500">
                      <span className="flex-1">Items Discount</span>
                      <span>- {formatPrice(cartSummary?.discount ?? 0)}</span>
                    </div>
                    <div className="flex ">
                      <span className="flex-1">Estimated VAT %</span>
                      <span>{formatPrice(cartSummary?.vat ?? 0)}</span>
                    </div>
                    <div className="flex ">
                      <span className="flex-1">Shipping</span>
                      <span>
                        {" "}
                        {cartSummary?.shipping_fee
                          ? formatPrice(cartSummary?.shipping_fee ?? 0)
                          : "FREE"}
                      </span>
                    </div>
                    <div className="flex ">
                      <span className="flex-1 ">
                        Total Amount (Inclusive of VAT)
                      </span>
                      <span className="text-blue-500">
                        {" "}
                        {formatPrice(cartSummary?.sub_total ?? 0)}
                      </span>
                    </div>
                  </div>
                  <Button
                    aria-label="View your cart"
                    className="w-full"
                    size={"sm"}
                    onClick={() => setTab("checkout")}
                  >
                    Proceed to checkout
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-1">
              <div
                aria-hidden="true"
                className="relative mb-4 h-60 w-60 text-muted-foreground "
              >
                <Image
                  src="/images/cart/empty-cart.png"
                  fill
                  alt="empty shopping cart hippo"
                />
              </div>
              <div className="text-2xl font-medium">Your cart is empty</div>
              <SheetTrigger asChild>
                <Link
                  href="/products"
                  shallow
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "t text-blue-400",
                  })}
                >
                  Add items to your cart to checkout
                </Link>
              </SheetTrigger>
            </div>
          )
        ) : cartItems.length > 0 ? (
          <>
            <div className={cn("flex flex-col h-full")}>
              <div className=" flex-1 h-full overflow-x-hidden">
                <div>
                  <h6 className=" font-semibold">Delivery Option</h6>
                  <Tabs defaultValue="home_delivery" className="w-full mt-3">
                    <TabsList className="grid w-full grid-cols-2">
                      {DELIVERY_OPTIONS.map((option) => (
                        <TabsTrigger value={option.value}>
                          {option.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <TabsContent value="home_delivery">
                      <div>
                        <div className="rounded-lg border shadow p-3 mt-4">
                          <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex gap-1.5 items-center ">
                              <MapPin className="text-slate-600 h-5 w-5" />
                              <h5 className="font-semibold text-sm">Home</h5>
                            </div>
                            <Button size={"sm"} className="h-7 text-xs">
                              Change
                            </Button>
                          </div>

                          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eos optio praesentium repudiandae saepe
                            reiciendis repellendus doloremque, alias blanditiis
                            similique ducimus asperiores eveniet, natus
                            voluptate quisquam qui dolorem, tempore adipisci
                            corrupti.
                          </p>
                          <p className=" mt-2 text-sm font-semibold">
                            +9715050505050
                          </p>
                        </div>
                        <div className="mt-4 flex flex-col gap-y-4">
                          {" "}
                          <div className="bg-pink-100 rounded-2xl p-1 px-4 flex items-center justify-between text-primary font-semibold text-sm ">
                            <p>Deliver from: ECOM</p>
                            <p>Shipment 1</p>
                          </div>
                          <div>
                            {shipmentData?.map(
                              ({ products, available_slots }) => (
                                <div>
                                  <div className="flex items-center gap-x-1.5">
                                    {products.map((product) => (
                                      <div className=" relative aspect-square h-16 w-16 max-w-fit border border-muted rounded-lg">
                                        <Image
                                          src={product.featured_image}
                                          className="object-cover object-center  rounded-lg"
                                          fill
                                          alt={product.title}
                                        />
                                        <div className="bg-green-400 rounded-2xl h-5 p-2 flex items-center justify-center absolute -right-2 -top-2 z-10 text-xs text-white">
                                          x {product.qty}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-3">
                                    {available_slots.map((slot) => (
                                      <>
                                        <Separator />

                                        <div className=" flex justify-between py-3 items-center">
                                          <label
                                            className="flex gap-x-5 cursor-pointer"
                                            htmlFor={slot.id.toString()}
                                          >
                                            <Image
                                              src={`https://www.lifepharmacy.com/images/${slot.shipment_label}-nr.svg`}
                                              height={30}
                                              width={30}
                                              alt="standard-icon"
                                            />
                                            <div className="flex flex-col gap-y-0.5">
                                              <h6 className="text-primary text-sm font-semibold">
                                                {slot.title}
                                              </h6>
                                              <p className="text-xs text-muted-foreground">
                                                {slot.subtitle}
                                              </p>
                                            </div>
                                          </label>
                                          <input
                                            type="radio"
                                            className="h-5 w-5 transition"
                                            id={slot.id.toString()}
                                            name={"delivery_slots"}
                                          />
                                        </div>
                                      </>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="collect_from_home">
                      Change your password here.
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            {/* <div className="flex w-full flex-col pr-6 h-full">
              <div className="h-full flex-1 overflow-x-hidden">
                <div className={"flex w-full flex-col gap-5"}>
                  {cartItems.map((cartItem) =>
                    cartItem.items.map((item) => {
                      const priceData = getPriceDataByLocale(
                        locale as locale,
                        item.prices
                      );

                      return (
                        <div className="space-y-3">
                          <div
                            className={cn(
                              "flex items-start justify-between gap-4"
                            )}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="relative aspect-square h-20 w-20 max-w-fit  overflow-hidden rounded-lg border">
                                {item?.featured_image ? (
                                  <Image
                                    src={item?.featured_image}
                                    alt={item.title}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    fill
                                    className="absolute object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center bg-accent" />
                                )}
                              </div>

                              <div className="flex flex-col gap-y-1 self-start">
                                <span className="line-clamp-1 text-sm font-medium ">
                                  {item.title}
                                </span>
                                {item.offers && (
                                  <div className="bg-green-500 w-fit rounded text-xs py-0.5 px-2 text-white">
                                    {getOfferLabel(item.offers)}
                                  </div>
                                )}
                                {priceData?.price &&
                                priceData?.price.regular_price !==
                                  priceData?.price.offer_price ? (
                                  <div className="flex items-center gap-3 mt-1 line-clamp-1">
                                    <p className=" font-medium  text-red-600">
                                      {formatPrice(
                                        priceData?.price.offer_price
                                      )}
                                    </p>
                                    <p className=" font-medium text-sm text-blue-600 line-through">
                                      {formatPrice(
                                        priceData?.price.regular_price || ""
                                      )}
                                    </p>
                                  </div>
                                ) : (
                                  <div className=" mt-1 line-clamp-1">
                                    <p className=" font-medium text-red-600">
                                      {formatPrice(
                                        priceData?.price.regular_price || ""
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <Separator />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className={cn("space-y-4 pr-6 ")}>
                <Separator />
                <div className="space-y-1.5 text-sm font-medium">
                  <div className="flex">
                    <span className="flex-1">Order Total</span>
                    <span>{formatPrice(cartSummary?.total ?? 0)}</span>
                  </div>
                  <div className="flex text-green-500">
                    <span className="flex-1">Items Discount</span>
                    <span>- {formatPrice(cartSummary?.discount ?? 0)}</span>
                  </div>
                  <div className="flex ">
                    <span className="flex-1">Estimated VAT %</span>
                    <span>{formatPrice(cartSummary?.vat ?? 0)}</span>
                  </div>
                  <div className="flex ">
                    <span className="flex-1">Shipping</span>
                    <span>
                      {" "}
                      {cartSummary?.shipping_fee
                        ? formatPrice(cartSummary?.shipping_fee ?? 0)
                        : "FREE"}
                    </span>
                  </div>
                  <div className="flex ">
                    <span className="flex-1 ">
                      Total Amount (Inclusive of VAT)
                    </span>
                    <span className="text-blue-500">
                      {" "}
                      {formatPrice(cartSummary?.sub_total ?? 0)}
                    </span>
                  </div>
                </div>
                <Button
                  aria-label="View your cart"
                  className="w-full"
                  size={"sm"}
                  onClick={() => setTab("checkout")}
                >
                  Proceed to checkout
                </Button>
              </div>
            </div> */}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/images/cart/empty-cart.png"
                fill
                alt="empty shopping cart hippo"
              />
            </div>
            <div className="text-2xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                shallow
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "t text-blue-400",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
});
