import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import AppShell from "../components/common/AppShell";
import { ToasterProvider } from "../contexts/ToasterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ToasterProvider>
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          </ToasterProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
