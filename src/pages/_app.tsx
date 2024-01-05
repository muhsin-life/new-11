import Layout from "@/components/Layout";
import { Providers } from "@/components/Provider";
import { addressStore } from "@/components/hooks/useStore";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import React from "react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { currentAddress } = addressStore();

  return (
    <Providers pageProps={pageProps}>
      <main
        className={cn(
          "relative h-full antialiased flex flex-col min-h-screen",
          poppins.className
        )}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster richColors />
      </main>
    </Providers>
  );
}
