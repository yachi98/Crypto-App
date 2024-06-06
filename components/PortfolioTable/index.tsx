import { useState } from "react";
import { useAppSelector } from "@/redux/store";
import { Portfolio } from "@/interfaces/portfolio.interface";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import PortfolioItem from "@/components/PortfolioItem";
import { useEffect } from "react";
import axios from "axios";

const PortfolioTable = () => {
  const { portfolioData } = useAppSelector((state) => state.portfolioData);
  const { coinId } = useAppSelector((state) => state.portfolioData);
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const historicalCoins = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=30-12-2023`
        );
        // setHistoricalCoins(historicalCoins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistoricalData();
  }, [portfolioData]);

  // useEffect(() => {
  //   const fetchHistoricalData = async () => {
  //     try {
  //       const results = await Promise.all(
  //         portfolioData.map(
  //           async (coin) =>
  //             await axios.get(
  //               `https://api.coingecko.com/api/v3/coins/${coin.coinId}/history?date=${coin.date}`
  //             )
  //         )
  //       );
  //       console.log(results);
  //       const historicalData = results.map((response) => response.data);
  //       setHistoricalCoins(historicalData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchHistoricalData();
  // }, [portfolioData]);

  return (
    <div className="mt-5">
      {portfolioData.map((item: Portfolio, index: number) => (
        <PortfolioItem key={index} item={item} />
      ))}
    </div>
  );
};

export default PortfolioTable;
