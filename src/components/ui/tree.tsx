import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ScrollArea } from "./scroll-area";
import { cn, truncate } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import useResizeObserver from "use-resize-observer";
import { Category } from "@/types/categories";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { useQueryState } from "next-usequerystate";

// interface TreeDataItem {
//   id: string;
//   name: string;
//   icon?: LucideIcon;
//   children?: TreeDataItem[];
// }

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data?: Category[];
  initialSlelectedItemId?: string;
  onSelectChange?: (item: Category | undefined) => void;
  expandAll?: boolean;
};

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      data,
      initialSlelectedItemId,
      onSelectChange,
      expandAll,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedItemId, setSelectedItemId] = React.useState<
      string | undefined | null
    >(initialSlelectedItemId);
    const handleSelectChange = React.useCallback(
      (item: Category | undefined) => {
        setSelectedItemId(item?.id);
        if (onSelectChange) {
          onSelectChange(item);
        }
      },
      [onSelectChange]
    );
    const expandedItemIds = React.useMemo(() => {
      if (!initialSlelectedItemId) {
        return [] as string[];
      }

      const ids: string[] = [];

      function walkTreeItems(items: Category[] | undefined, targetId: string) {
        if (items instanceof Array) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < items.length; i++) {
            ids.push(items[i]!.slug);
            if (walkTreeItems(items[i].children!, targetId) && !expandAll) {
              return true;
            }
            if (!expandAll) ids.pop();
          }
        }
        // else if (!expandAll && items.id === targetId) {
        //       return true;
        //     } else if (items.children) {
        //       return walkTreeItems(items.children, targetId);
        //     }
      }

      walkTreeItems(data, initialSlelectedItemId);
      return ids;
    }, [data, initialSlelectedItemId]);

    const { ref: refRoot, width, height } = useResizeObserver();

    return (
      <div ref={refRoot} className={cn("overflow-hidden w-full", className)}>
        <ScrollArea style={{ width, height }}>
          <div className="relative ">
            <TreeItem
              data={data}
              ref={ref}
              selectedItemId={selectedItemId}
              handleSelectChange={handleSelectChange}
              expandedItemIds={expandedItemIds}
              {...props}
            />
          </div>
        </ScrollArea>
      </div>
    );
  }
);

type TreeItemProps = TreeProps & {
  selectedItemId?: string | null;
  handleSelectChange: (item: Category | undefined) => void;
  expandedItemIds: string[];
};

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      data,
      selectedItemId,
      handleSelectChange,
      expandedItemIds,
      ...props
    },
    ref
  ) => {
    const [categoriesQuery, setCategoriesQuery] = useQueryState("categories");

    return (
      <div ref={ref} role="tree" className={className} {...props}>
        <ul className="gap-1.5 flex flex-col">
          {data instanceof Array
            ? data.map((item) => (
                <li key={item.id}>
                  {item.children && item.children.length > 0 ? (
                    <AccordionPrimitive.Root
                      type="multiple"
                      defaultValue={expandedItemIds}
                    >
                      <AccordionPrimitive.Item
                        value={item.slug}
                        className="w-full"
                      >
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={item.id}
                              checked={categoriesQuery === item.slug}
                              onCheckedChange={() => handleSelectChange(item)}
                            />
                            <Label
                              htmlFor={item.id}
                              className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {`${truncate(item.name, 20)} `}
                            </Label>
                          </div>
                          <div className="flex gap-1 items-center">
                            {item.product_count && item.product_count > 0 ? (
                              <div className="flex justify-center rounded-xl h-5 text-sm px-2 text-white bg-green-500">
                                {item.product_count}
                              </div>
                            ) : null}
                            <AccordionTrigger
                              className={cn(
                                "px-2 hover:before:opacity-100 before:absolute before:left-0 before:w-full before:opacity-0 before:bg-muted/80 before:h-[2.2rem] before:-z-10",
                                selectedItemId === item.id &&
                                  "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
                              )}
                            ></AccordionTrigger>
                          </div>
                        </div>

                        <AccordionContent className="pl-6 pt-2">
                          <TreeItem
                            data={item.children}
                            selectedItemId={selectedItemId}
                            handleSelectChange={handleSelectChange}
                            expandedItemIds={expandedItemIds}
                          />
                        </AccordionContent>
                      </AccordionPrimitive.Item>
                    </AccordionPrimitive.Root>
                  ) : (
                    <div className="flex justify-between h-[1.8rem]">
                      <div className="flex items-center space-x-3">
                        <Checkbox id={item.id} />
                        <Label
                          htmlFor={item.id}
                          className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {`${truncate(item.name, 20)} `}
                        </Label>
                      </div>
                    </div>
                  )}
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
);

// const Leaf = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement> & {
//     item: Category;
//     isSelected?: boolean;
//     Icon?: LucideIcon;
//   }
// >(({ className, item, isSelected, Icon, ...props }, ref) => {
//   return (
//     <div
//       ref={ref}
//       className={cn(
//         "flex items-center py-2 px-2 cursor-pointer \
//         hover:before:opacity-100 before:absolute before:left-0 before:right-1 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
//         className,
//         isSelected &&
//           "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
//       )}
//       {...props}
//     >
//       {item.icon && (
//         <item.icon
//           className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50"
//           aria-hidden="true"
//         />
//       )}
//       {!item.icon && Icon && (
//         <Icon
//           className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50"
//           aria-hidden="true"
//         />
//       )}
//       <span className="flex-grow text-sm truncate">{item.name}</span>
//     </div>
//   );
// });

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 w-full items-center py-2 transition-all last:[&[data-state=open]>svg]:rotate-90",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 ml-auto" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-1 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Tree };
