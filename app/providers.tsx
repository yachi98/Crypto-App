"use client";

import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <ReduxProvider>{children}</ReduxProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
