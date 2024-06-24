"use client";

import { useAppSelector } from "@/redux/store";
import { Portfolio } from "@/interfaces/portfolio.interface";
import PortfolioItem from "@/components/PortfolioItem";

const PortfolioTable = () => {
  const { portfolioData } = useAppSelector((state) => state.portfolioData);

  return (
    <div className="mt-5">
      {portfolioData.map((coin: Portfolio) => (
        <PortfolioItem key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default PortfolioTable;
