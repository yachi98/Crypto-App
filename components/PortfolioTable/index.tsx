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

  // useEffect(() => {
  //   const fetchHistoricalData = async () => {
  //     try {
  //       const results = await Promise.all(
  //         portfolioData.map((coin) =>
  //           axios.get(
  //             `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2023`
  //           )
  //         )
  //       );
  //       const historicalData = results.map((response) => response.data);
  //       console.log(historicalData);
  //       setHistoricalCoins(historicalData);
  //     } catch (error) {
  //       console.error("Failed to fetch historical data:", error);
  //     }
  //   };

  //   if (portfolioData.length) {
  //     fetchHistoricalData();
  //   }
  // }, [portfolioData]);

  return (
    <div className="mt-5">
      {portfolioData.map((coin: Portfolio) => (
        <PortfolioItem key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default PortfolioTable;
