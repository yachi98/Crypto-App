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
  const [histValue, setHistValue] = useState("");
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);

  //   useEffect(() => {
  //     const fetchHistoricalData = async () => {
  //       try {
  //         const historicalCoins = await axios.get(
  //           `https://api.coingecko.com/api/v3/coins/${histValue}/history?date=30-12-2023`
  //         );
  //         // setHistoricalCoins(historicalCoins);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchHistoricalData();
  //   }, [portfolioData]);

  // export const getPortfolioData = createAsyncThunk(
  //   "portfolioData/getPortfolioData",
  //   async (coinId: string, { rejectWithValue }) => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=30-12-2023`
  //       );
  //       console.log("hello", data);
  //       return data;
  //     } catch (error) {
  //       return rejectWithValue(error);
  //     }
  //   }
  // );

  return (
    <div className="mt-5">
      {portfolioData.map((item: Portfolio) => (
        <PortfolioItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PortfolioTable;

//   useEffect(() => {
//     const fetchHistoricalData = async () => {
//       try {
//         const results = await Promise.all(
//           portfolioData.map((coin) =>
//             axios.get(
//               `https://api.coingecko.com/api/v3/coins/${coin.coinId}/history?date=${coin.date}`
//             )
//           )
//         );
//         const historicalData = results.map((response) => response.data);
//         setHistoricalCoins(historicalData);
//       } catch (error) {
//         console.error("Failed to fetch historical data:", error);
//       }
//     };

//     if (portfolioData.length) {
//       fetchHistoricalData();
//     }
//   }, [portfolioData]);
