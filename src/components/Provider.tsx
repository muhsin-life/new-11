import NiceModal from "@ebay/nice-modal-react";
import { ReactNode, useState } from "react";
import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

interface ProviderProps {
  children: ReactNode;
  pageProps: any;
}
export function Providers({ children, pageProps }: ProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <NiceModal.Provider>{children}</NiceModal.Provider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
