import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import InfoBar from "@/components/InfoBar";
import NavBar from "@/components/NavBar";
import PriceChart from "@/components/PriceChart";
import "./globals.css";
import CoinMarketTable from "@/components/CoinMarketTable";
import CoinGraphChart from "@/components/CoinGraphChart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coin Wave",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <div className="max-w-screen-2xl mx-auto">
          <NavBar />
          <InfoBar />
          <PriceChart />
          <CoinGraphChart />
          <CoinMarketTable />
          <body
            className={`${inter.className} dark:bg-gray-950 bg-light-theme`}
          >
            {children}
          </body>
        </div>
      </Providers>
    </html>
  );
}
