import {
  Sheet,
  SheetContent,
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
import { useLocale } from "./hooks/useLocale";
import { OrderSummary } from "./OrderSummary";

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

  return (
    <Sheet open={modal.visible} onOpenChange={modal.hide}>
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
                <OrderSummary
                  summaryProps={{
                    props: [
                      {
                        label: "Order Total",
                        price: formatPrice(cartSummary?.discount ?? 0),
                      },
                      {
                        label: "Items Discount",
                        classNames: "text-green-500",
                        price: `- ${formatPrice(cartSummary?.total ?? 0)}`,
                      },
                      {
                        label: "Estimated VAT %",
                        price: formatPrice(cartSummary?.vat ?? 0),
                      },
                      {
                        label: "Shipping",
                        price:
                          cartSummary?.shipping_fee !== 0
                            ? formatPrice(cartSummary?.shipping_fee ?? 0)
                            : "FREE",
                      },
                    ],
                    total: cartSummary?.sub_total,
                  }}
                >
                  <Button
                    aria-label="View your cart"
                    className="w-full "
                    onClick={() => setTab("checkout")}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </OrderSummary>
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
            <div className=" flex flex-col -mr-1 flex-1 overflow-x-hidden ">
              <div>
                <h6 className=" font-semibold">Delivery Option</h6>
                <Tabs defaultValue="home_delivery" className="w-full mt-3 ">
                  <TabsList className="grid w-full grid-cols-2">
                    {DELIVERY_OPTIONS.map((option) => (
                      <TabsTrigger value={option.value}>
                        {option.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="home_delivery" className="h-full flex-1 ">
                    <div>
                      <DeliveryAddress />
                      <ShipmentDetails />
                      <DeliveryInstructions />
                      <Notes />
                      <ReturnPolicy />
                      <Tips />
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="collect_from_store"
                    className="h-full flex-1"
                  >
                    <div className="border border-muted-foreground rounded-lg flex items-center justify-center h-28 w-full mt-4">
                      <p className="text-sm font-medium text-primary">
                        Current not available in your area
                      </p>
                    </div>
                    <Notes />
                    <ReturnPolicy />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <OrderSummary
              summaryProps={{
                props: [
                  {
                    label: "Order Total",
                    price: formatPrice(cartSummary?.discount ?? 0),
                  },
                  {
                    label: "Items Discount",
                    classNames: "text-green-500",
                    price: `- ${formatPrice(cartSummary?.total ?? 0)}`,
                  },
                  {
                    label: "Estimated VAT %",
                    price: formatPrice(cartSummary?.vat ?? 0),
                  },
                  {
                    label: "Shipping",
                    price:
                      cartSummary?.shipping_fee !== 0
                        ? formatPrice(cartSummary?.shipping_fee ?? 0)
                        : "FREE",
                  },
                ],
                total: cartSummary?.sub_total,
              }}
            >
              <Button
                aria-label="View your cart"
                className="w-full "
                // onClick={() =>
                //   Modals.show("test", {
                //     title: "Select Payment Method",
                //     children: <PaymentMethods />,
                //   } as DialogProps)
                // }
              >
                SELECT PAYMENT METHOD
              </Button>
            </OrderSummary>
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

const Notes = () => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-x-3 shadow p-3 border border-muted rounded-lg">
        <Image
          src={"https://www.lifepharmacy.com/images/notes.svg"}
          height={30}
          width={30}
          alt="notes"
        />
        <Input
          className="border border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Add a note"
        />
      </div>
    </div>
  );
};

const ReturnPolicy = () => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-x-3 shadow p-3 border border-muted rounded-lg">
        <Image
          src={"https://www.lifepharmacy.com/images/return.svg"}
          height={30}
          width={30}
          alt="notes"
        />
        <div className="flex flex-col gap-y-0.5">
          <h6 className="text-primary font-semibold text-sm">Return Policy</h6>
          <p className="text-muted-foreground text-xs">
            Orders once placed cannot be returned or exchanged.
          </p>
        </div>
      </div>
    </div>
  );
};

const DeliveryAddress = () => {
  return (
    <div className="rounded-lg border shadow p-3 mt-4">
      <div className="flex items-center justify-between border-b pb-1.5">
        <div className="flex gap-1.5 items-center ">
          <MapPin className="text-slate-600 h-5 w-5" />
          <h5 className="font-semibold text-sm">Home</h5>
        </div>
        <Button size={"sm"} className="h-6 text-xs">
          CHANGE
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos optio
        praesentium repudiandae saepe reiciendis repellendus doloremque, alias
        blanditiis similique ducimus asperiores eveniet, natus voluptate
        quisquam qui dolorem, tempore adipisci corrupti.
      </p>
      <p className=" mt-2 text-sm font-semibold">Phone: +9715050505050</p>
    </div>
  );
};

const DeliveryInstructions = () => {
  const { store } = useCart();

  const instructions = store.cart.cart?.delivery_instructions ?? [];

  interface instructionProps {
    value: number;
    title: string;
  }

  const [selectedInstructions, setInstruction] = useState<instructionProps[]>(
    []
  );

  return (
    <div className="mt-4 flex flex-col gap-y-3">
      <h6 className="text-primary font-semibold">Delivery Instruction</h6>
      <div className="flex items-center justify-between overflow-x-auto">
        {instructions?.map((instruction) => (
          <button
            className={cn(
              "flex flex-col flex-shrink-0 gap-1.5 items-start w-24 p-3 h-28 rounded-lg border shadow-sm",
              {
                "bg-cyan-50 border-cyan-200 ": selectedInstructions.some(
                  (instr) => instr.title === instruction.instruction
                ),
              }
            )}
            onClick={() => {
              const filteredData = selectedInstructions.filter(
                (instr) => instr.value !== instruction.value
              );

              setInstruction((prev) => {
                return filteredData.length !== selectedInstructions.length
                  ? [
                      ...filteredData,
                      {
                        value: instruction.value,
                        title: instruction.instruction,
                      },
                    ]
                  : [
                      ...prev,
                      {
                        value: instruction.value,
                        title: instruction.instruction,
                      },
                    ];
              });
            }}
          >
            <Image
              src={instruction.icon_unselected}
              height={30}
              width={30}
              alt={instruction.instruction}
            />
            <p className="text-primary font-medium text-xs text-left">
              {instruction.instruction}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

const ShipmentDetails = () => {
  const { store } = useCart();

  const shipmentData = store.cart.cart?.shipment_data ?? [];

  return (
    <div className="mt-4 flex flex-col gap-y-4">
      {" "}
      <div className="bg-rose-100 rounded-2xl p-1 px-4 flex items-center justify-between text-primary font-semibold text-sm ">
        <p>Deliver from: ECOM</p>
        <p>Shipment 1</p>
      </div>
      {shipmentData?.map(({ products, available_slots }) => (
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
                    className="flex gap-x-4 cursor-pointer"
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
            <Separator />
          </div>
        </div>
      ))}
    </div>
  );
};

const Tips = () => {
  const { store } = useCart();
  const { SELECTED_COUNTRY_DETAILS } = useLocale();

  const tips = store.cart.cart?.driver_tips ?? [];

  const [selectedTip, setTip] = useState<null | number>(null);

  return (
    <div className="mt-4 shadow rounded-lg border border-muted p-3 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-0.5 ">
          <h6 className="text-primary font-semibold text-sm">
            Tip your delivery partner
          </h6>
          <p className="text-muted-foreground text-xs">
            100% of the tip will be paid to the rider
          </p>
        </div>
        {selectedTip ? (
          <div className="text-xs font-semibold text-primary flex flex-col items-end ">
            <div>
              {SELECTED_COUNTRY_DETAILS.currency} {selectedTip}
            </div>
            <button
              className="py-0 px-0 text-destructive"
              onClick={() => setTip(null)}
            >
              CLEAR
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-x-4">
          {tips?.map((tip) => (
            <button
              className={cn(
                "flex gap-x-1 font-semibold bg-white drop-shadow p-2 border border-muted rounded-lg text-primary relative",
                {
                  "bg-cyan-50 border-cyan-200": selectedTip === tip.value,
                }
              )}
              onClick={() => setTip(tip.value)}
            >
              <span>{tip.icon}</span>{" "}
              <span className="text-sm">
                {SELECTED_COUNTRY_DETAILS.currency} {tip.value}
              </span>
              {tip.label && (
                <div className="absolute -bottom-2 left-0 right-0 bg-red-500 text-white text-[10px] rounded-b-lg">
                  {tip.label}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
