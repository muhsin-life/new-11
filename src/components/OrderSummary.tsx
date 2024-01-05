import { cn, formatPrice } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

interface OrderSummary {
  label: string;
  price: string;
  classNames?: ClassValue;
}

interface props {
  props: OrderSummary[];
  total?: number;
}

export const OrderSummary = ({
  summaryProps,
  children,
}: {
  summaryProps: props;
  children: ReactNode;
}) => {
  return (
    <div className={cn("space-y-4 ")}>
      <div />
      <div className="space-y-2 text-sm font-medium border shadow p-3 border-muted rounded-lg">
        {summaryProps.props.map((summary) => (
          <div className={cn("flex", summary.classNames)}>
            <span className="flex-1">{summary.label}</span>
            <span>{summary.price}</span>
          </div>
        ))}

        <div className="flex border-t pt-2">
          <span className="flex-1 ">
            Total Amount{" "}
            <span className="text-xs text-slate-400 font-light">
              {" "}
              (Inclusive of VAT)
            </span>
          </span>
          <span className="text-primary font-semibold">
            {" "}
            {formatPrice(summaryProps?.total ?? 0)}
          </span>
        </div>
        <Image
          src={"https://www.lifepharmacy.com/images/payment-method.svg"}
          width={100}
          height={50}
          className="w-1/2 mx-auto"
          alt="payment-methods"
        />
      </div>
      {children}
    </div>
  );
};
