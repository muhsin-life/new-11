import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Label } from "./ui/label";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Category } from "@/types/categories";
import { useBrands, useCategories } from "./hooks/useData";
import { Tree } from "./ui/tree";
import { filterProps } from "./ProductPageListing";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "next-usequerystate";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  brandCatData?: Category[];
  page_type: "brand" | "products" | "category";
  filtersOnChange: ({ type, value, Isredirect }: filterProps) => void;
}

export const Sidebar = ({
  className,
  brandCatData,
  page_type,
  filtersOnChange,
}: SidebarProps) => {
  const getSidebarByPageType = () => {
    if (page_type === "brand") {
      return (
        <BrandSideBar
          brandCatData={brandCatData as Category[]}
          filtersOnChange={filtersOnChange}
        />
      );
    } else {
      return <CategoriesSidebar filtersOnChange={filtersOnChange} />;
    }
  };

  return <div className={cn("pb-12", className)}>{getSidebarByPageType()}</div>;
};

export const BrandSideBar = ({
  brandCatData,
  filtersOnChange,
}: {
  brandCatData: Category[];
  filtersOnChange: ({ type, value, Isredirect }: filterProps) => void;
}) => {
  const { query } = useRouter();
  const activeItem = query?.singleCategory ?? "";

  return (
    <div className="space-y-4 py-4">
      <div className="py-2 gap-1.5 flex flex-col">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">Category</h2>
        <div className="space-y-1">
          {brandCatData.map((category) => (
            <Button
              onClick={() =>
                filtersOnChange({
                  type: "category_slug",
                  value: category.slug,
                  Isredirect: false,
                })
              }
              variant={activeItem === category.slug ? "secondary" : "ghost"}
              className={"w-full justify-between"}
            >
              {category.name}
              <div className="rounded-xl px-2 h-5 bg-primary-foreground border text-xs text-balck leading-5">
                {category.count}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CategoriesSidebar = ({
  filtersOnChange,
}: {
  filtersOnChange: ({
    type,
    value,
    Isredirect,
    clearExistingQueries,
  }: filterProps) => void;
}) => {
  const id = React.useId();

  const [brandsQuery, setBrandsQuery] = useQueryState(
    "brands",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [instantQuery, setInstantQuery] = useQueryState(
    "instant_only",
    parseAsInteger.withDefault(0)
  );
  const [categoriesQuery, setCategoriesQuery] = useQueryState("categories");
  const [collectionQuery, setCollectionQuery] = useQueryState("collections");
  const [minPriceQuery, setMinPriceQuery] = useQueryState(
    "min_price",
    parseAsInteger.withDefault(0)
  );
  const [maxPriceQuery, setMaxPriceQuery] = useQueryState(
    "max_price",
    parseAsInteger.withDefault(99999)
  );

  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    minPriceQuery,
    maxPriceQuery,
  ]);

  const { data, isLoading } = useCategories();
  const { data: brands, refetch } = useBrands();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="col-span-3">
      <div className="flex flex-1 flex-col gap-5 overflow-hidden p-1">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="gap-1">
            <Label className="text-base" htmlFor={`active-${id}`}>
              Show Instant Products
            </Label>
            <CardDescription>
              Only show products with instant delivery
            </CardDescription>
          </div>
          <Switch
            id={`active-${id}`}
            defaultChecked={instantQuery === 1}
            onCheckedChange={(checked) => {
              if (checked) {
                filtersOnChange({
                  type: "instant_only",
                  value: "1",
                });
                setInstantQuery(1);
              } else {
                filtersOnChange({
                  type: "instant_only",
                  value: "0",
                });
                setInstantQuery(null);
              }
            }}
          />
        </div>
        <Card className="space-y-5 rounded-lg p-3">
          <h3 className="font-medium tracking-wide text-foreground">
            Price range ($)
          </h3>
          <Slider
            defaultValue={priceRange}
            max={99999}
            step={100}
            value={priceRange}
            onValueChange={(value: typeof priceRange) => {
              setPriceRange([value[0], value[1]]);
            }}
          />
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPriceRange([value, priceRange[1]]);
              }}
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              inputMode="numeric"
              min={priceRange[0]}
              max={99999}
              value={priceRange[1]}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPriceRange([priceRange[0], value]);
              }}
            />
          </div>
          <Button
            className="w-full bg-blue-500"
            size={"sm"}
            onClick={() => {
              if (minPriceQuery !== priceRange[0]) {
                filtersOnChange({
                  type: "min_price",
                  value: priceRange[0].toString(),
                });
                setMinPriceQuery(priceRange[0]);
              } else {
                filtersOnChange({
                  type: "max_price",
                  value: priceRange[1].toString(),
                });
                setMaxPriceQuery(priceRange[1]);
              }
            }}
          >
            FILTER
          </Button>
        </Card>

        <Card className="space-y-4 overflow-hidden rounded-lg p-3">
          <div className="flex justify-between">
            <h3 className="flex-1  text-lg font-medium tracking-wide text-foreground">
              Categories
            </h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
          <div className="flex min-h-full ">
            <Tree
              data={data?.data.categories}
              className=""
              onSelectChange={(item) => {
                filtersOnChange({
                  type: "categories",
                  value: item?.slug ?? "no-slug",
                  clearExistingQueries: true,
                });

                setBrandsQuery(null);
                setCollectionQuery(null);
                setCategoriesQuery(item?.slug ?? "");
              }}
            />
          </div>
        </Card>

        <Card className="space-y-4 overflow-hidden rounded-lg p-3">
          <div className="flex justify-between">
            <h3 className="flex-1  text-lg font-medium tracking-wide text-foreground">
              Brands
            </h3>
          </div>
          <ScrollArea className="h-56 pb-5">
            <div className="space-y-4">
              {brands?.data.brands.map((brand) => (
                <div className="flex justify-between w-full" key={brand.id}>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      defaultChecked={brandsQuery.includes(brand.slug)}
                      id={brand.id}
                      onCheckedChange={(checkedState) => {
                        if (checkedState) {
                          filtersOnChange({
                            type: "brands",
                            value: [...brandsQuery, brand.slug].toString(),
                          });
                          setBrandsQuery((brands) => [...brands, brand.slug]);
                        } else {
                          filtersOnChange({
                            type: "brands",
                            value: brandsQuery
                              .filter((b) => b !== brand.slug)
                              .toString(),
                          });
                          setBrandsQuery((brands) =>
                            brands.filter((b) => b !== brand.slug)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={brand.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};
