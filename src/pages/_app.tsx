import Layout from "@/components/Layout";
import { Providers } from "@/components/Provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
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
      </main>
    </Providers>
  );
}
