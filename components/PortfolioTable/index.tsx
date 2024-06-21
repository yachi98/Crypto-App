import { useAppSelector } from "@/redux/store";
import { Portfolio } from "@/interfaces/portfolio.interface";
import PortfolioItem from "@/components/PortfolioItem";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import { useEffect, useState } from "react";
import axios from "axios";

interface PortfolioModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PortfolioTable = ({ showModal, setShowModal }: PortfolioModalProps) => {
  const { portfolioData } = useAppSelector((state) => state.portfolioData);
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);

  return (
    <div className="mt-5">
      {portfolioData.map((coin: Portfolio) => (
        <PortfolioItem key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default PortfolioTable;
