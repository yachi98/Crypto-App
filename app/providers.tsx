"use client";

import { ReduxProvider } from "@/redux/provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "next-themes";
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
