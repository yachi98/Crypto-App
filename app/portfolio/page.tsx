"use client";

import { useState, useEffect } from "react";
import PortfolioModal from "@/components/PortfolioModal";
import PortfolioTable from "@/components/PortfolioTable";
import { useAppSelector } from "@/redux/store";
import axios from "axios";

const PortfolioPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loadCoins, setLoadCoins] = useState([]);
  const { portfolioData } = useAppSelector((state) => state.portfolioData);
  const { currency } = useAppSelector((state) => state.currencySlice);

  useEffect(() => {
    const searchCoinData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        console.log(data);
        setLoadCoins(data);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    searchCoinData();
  }, [currency]);

  return (
    <div className="dark:bg-gray-950 bg-light-theme max-w-screen-2xl m-auto h-screen p-2 relative">
      <div className={`w-full h-full ${showModal ? "blur-2xl" : ""}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl mt-5">Portfolio</h2>
          <button
            onClick={() => setShowModal(true)}
            className="p-3 dark:bg-[#0d121d] bg-white dark:hover:bg-[#121929] dark:text-[#686868] dark:hover:text-white dark:hover:border-white rounded-2xl text-md mt-5 w-[160px]"
          >
            Add Asset
          </button>
        </div>
        {portfolioData.length === 0 && (
          <p className="w-[550px] mt-5">
            Manage your crypto assets with ease! Whether you‘re a seasoned
            trader or just getting started in the exciting world of
            cryptocurrencies, this portfolio tool is designed to help you keep
            track of your investments effortlessly. You can add your coins by
            simply clicking on the Add Asset button above.
          </p>
        )}
        <PortfolioTable />
      </div>
      {showModal && (
        <PortfolioModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default PortfolioPage;
