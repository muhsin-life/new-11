import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  visible: boolean;
}

const Alert = ({ message, visible, className, ...props }: AlertProps) => {
  return(
  <div
    className={cn(
      "flex gap-2   p-1.5 rounded-lg items-center",
      className,
      {
        "animate-in fade-in-10 slide-in-from-top-5 ": visible,
      }
    )}
    {...props}
  >
    <ExclamationTriangleIcon className="h-4 w-4 text-destructive" />
    <p className="text-xs text-red-900 font-medium">{message}</p>
  </div>
  )
};

export { Alert };
