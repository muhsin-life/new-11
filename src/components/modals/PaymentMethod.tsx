import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export const PaymentMethods = () => {
  type Ttabs = "select_payment" | "new_card";

  const [tab, setTab] = useState<Ttabs>("select_payment");

  const PAYMENT_METHODS = [
    {
      method: "new_card",
      title: "New card",
      short_title: "NEW CARD",
      heading: "New Card",
      description: "Pay with new card",
      icon: "card",
      icon_url: "",
      selected: true,
      fees: 0,
      cart_refresh: false,
      error: false,
    },
    {
      method: "tabby",
      title: "Tabby",
      short_title: "TABBY",
      heading: "Tabby",
      description: "Pay in 4, No interest, no fees",
      icon: "tabby",
      icon_url:
        "https://lifeadmin-app.s3.me-south-1.amazonaws.com/EcomApp/pg/tabby-logo.png",
      selected: false,
      cart_refresh: true,
      error: false,
    },
  ];

  const paymentMethods = PAYMENT_METHODS;

  const paymentMethodOnClick = (method: string) => {
    switch (method) {
      case "new_card":
        setTab("new_card");

      case "tabby":
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {tab === "select_payment" ? (
        <>
          <div className="flex justify-start w-full pb-4">
            <h6 className="text-lg font-semibold ">Select Payment Method</h6>
          </div>

          <RadioGroup
            className="w-full flex flex-col gap-2 "
            onValueChange={(value) => paymentMethodOnClick(value)}
          >
            {paymentMethods?.map((method) => (
              <Label
                htmlFor={method.method}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-between flex h-14 items-center"
                )}
              >
                <div className="flex gap-x-3 items-center ">
                  <>
                    <Image
                      src={
                        method.icon_url !== ""
                          ? method.icon_url
                          : "https://www.lifepharmacy.com/images/payment-method.svg"
                      }
                      height={100}
                      width={100}
                      className=" h-5 w-12 object-cover object-left"
                      alt={method.heading}
                    />
                    <div className="flex flex-col items-start">
                      <p className="font-semibold ">{method.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {" "}
                        {method.description}
                      </p>
                    </div>
                  </>
                </div>

                <RadioGroupItem
                  className="h-5 w-5 transition"
                  value={method.method}
                  id={method.method}
                />
              </Label>
            ))}
            <Button className="w-full">CONTINUE</Button>
          </RadioGroup>
        </>
      ) : null}

      {tab === "new_card" ? (
        <>
          <div className="flex justify-center w-full pb-4">
            <Button
              variant={"ghost"}
              className={"absolute left-4 top-4 h-9 w-9"}
              size={"icon"}
              onClick={() => setTab("select_payment")}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <h6 className="text-lg font-semibold">Add New Card</h6>
          </div>
          <div className="flex flex-col gap-5">
            {/* <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="First Last" />
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="number">Card number</Label>
              <div className="relative">
                <Image
                  src={"https://www.lifepharmacy.com/images/payment-method.svg"}
                  height={100}
                  width={100}
                  alt={"Card Image"}
                  className=" h-5 w-20 object-cover object-left absolute right-4 inset-y-0 my-auto "
                />
                <Input
                  id="number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="pe-7"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="month">Expiry Date</Label>
                <Select>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Select>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={`${new Date().getFullYear() + i}`}
                      >
                        {new Date().getFullYear() + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="CVV" />
              </div>
            </div>
            <Button className="w-full">SAVE CARD AND CONTINUE</Button>
          </div>
        </>
      ) : null}
    </div>
  );
};
