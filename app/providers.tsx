"use client";

import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <ReduxProvider>{children}</ReduxProvider>
    </ThemeProvider>
  );
};

export default Providers;
