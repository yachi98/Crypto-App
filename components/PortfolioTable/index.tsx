import { useState } from "react";
import { useAppSelector } from "@/redux/store";
import { Portfolio } from "@/interfaces/portfolio.interface";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import PortfolioItem from "@/components/PortfolioItem";
import { useEffect } from "react";
import axios from "axios";

interface PortfolioModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const PortfolioTable = ({ showModal, setShowModal }: PortfolioModalProps) => {
  const { portfolioData } = useAppSelector((state) => state.portfolioData);
  //   const { coinId } = useAppSelector((state) => state.portfolioData);
  const [coinValue, setCoinValue] = useState("");
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);

  const coinIds: string[] = portfolioData.map((coin) => coin.coinId);
  //   This creates an array of coin IDs from portfolioData.
  const individualCoins: string[] = coinIds.filter(
    (coin, index) => coinIds.indexOf(coin) === index
  );
  //   This filters coinIds to get an array of unique coin IDs, removing duplicates.

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const results = await Promise.all(
          portfolioData.map(
            (coin) =>
              axios.get(
                `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2023`
              )
            // axios.get(
            //   `https://api.coingecko.com/api/v3/coins/${coin.coinId}/history?date=${coin.date}`
            // )
          )
        );
        const historicalData = results.map((response) => response.data);
        console.log(historicalData);
        setHistoricalCoins(historicalData);
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
      }
    };

    if (portfolioData.length) {
      fetchHistoricalData();
    }
  }, [portfolioData]);

  const hasCoinData = historicalCoins.length > 0;

  //   creates a new array of promises by mapping over portfolioData. For each coin, it makes an HTTP GET request to the CoinGecko API using axios.get.
  //   Promise.all is used to run all these requests concurrently. It takes an array of promises and returns a single promise that resolves when all of the promises in the array have resolved. If any promise is rejected, it is caught by the catch block.
  //   his line creates a new array historicalData by mapping over results. Each result is an Axios response object, and response.data extracts the data part of each response.

  return (
    <div className="mt-5">
      {/* {hasCoinData && */}
      {portfolioData.map((coin: Portfolio) => (
        <PortfolioItem key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default PortfolioTable;
