"use client";

import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Portfolio } from "@/interfaces/portfolio.interface";
import PortfolioItem from "@/components/PortfolioItem";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import { useState } from "react";

interface PortfolioModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PortfolioTable = ({ showModal, setShowModal }: PortfolioModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { portfolioData } = useAppSelector((state) => state.portfolioData);
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);

  console.log("state", portfolioData);

  return (
    <div className="mt-5">
      {portfolioData.map((coin: Portfolio) => (
        <PortfolioItem key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default PortfolioTable;
