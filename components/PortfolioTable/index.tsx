import { useAppSelector } from "@/redux/store";
import { Portfolio } from "@/interfaces/portfolio.interface";
import PortfolioItem from "@/components/PortfolioItem";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { getHistoricalData } from "@/redux/features/portfolioSlice";

interface PortfolioModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PortfolioTable = ({ showModal, setShowModal }: PortfolioModalProps) => {
  const { portfolioData } = useAppSelector((state) => state.portfolioData);
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);

  console.log(historicalCoins);

  // console.log(portfolioData);

  // useEffect(() => {
  //   dispatch(getHistoricalData())
  // })

  // const coinData: Coin = portfolioData.find((coin) => coin.id === coin.id);
  // const coinData: Portfolio = portfolioData.find(
  //   (coin) => coin.id === item.coinId
  // );

  // const coinIds: string[] = portfolioData.map((coin) => coin.coin.id);
  // //   This creates an array of coin IDs from portfolioData.
  // const individualCoins: string[] = coinIds.filter(
  //   (coin, index) => coinIds.indexOf(coin) === index
  // );
  //   This filters coinIds to get an array of unique coin IDs, removing duplicates.

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const historicalData = portfolioData.map(async (coin) => {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.date}`
          );
          const data = response.data;
          return data;
        });

        const historicalCoinsData = await Promise.all(historicalData);
        // console.log(results);
        setHistoricalCoins(historicalCoinsData);
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
      }
    };

    if (portfolioData.length) {
      fetchHistoricalData();
    }
  }, [portfolioData]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const historicalData = portfolioData.map(
          async (coin) =>
            await axios.get(
              `https://api.coingecko.com/api/v3/coins/${coin.coinApiId}/history?date=${coin.date}`
            )
        );

        const results = await Promise.all(historicalData);
        console.log(results);
        // setHistoricalCoins(results);
        return results;
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
      }
    };

    if (portfolioData.length) {
      fetchHistoricalData();
    }
  }, [portfolioData]);

  return (
    <div className="mt-5">
      {portfolioData.map((coin: Portfolio, index: number) => (
        <PortfolioItem key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default PortfolioTable;
