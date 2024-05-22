"use client";

import { useState } from "react";
import { HistoricalCoin } from "@/interfaces/historicalCoin.interface";
import PortfolioModal from "@/components/PortfolioModal";

interface PortfolioItem {
  value: string;
  amount: string;
  date: string;
}

const PortfolioPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [historicalCoins, setHistoricalCoins] = useState<HistoricalCoin[]>([]);
  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioItem[]>([]);

  return (
    <div className="dark:bg-[#09090c] bg-light-theme max-w-screen-2xl m-auto h-screen p-2 relative">
      <div className={` w-full h-full ${showModal ? "blur-2xl" : ""}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl mt-5">Portfolio</h2>
          <button
            onClick={() => setShowModal(true)}
            className="p-5 dark:bg-black bg-white dark:text-[#686868] dark:hover:text-white border dark:border-[#686868] dark:hover:border-white transition rounded-2xl text-md mt-5 w-[200px]"
          >
            Add Asset
          </button>
        </div>
        <p className="w-[550px] mt-5">
          Manage your crypto assets with ease! Whether you‘re a seasoned trader
          or just getting started in the exciting world of cryptocurrencies,
          this portfolio tool is designed to help you keep track of your
          investments effortlessly. You can add your coins by simply clicking on
          the Add Asset button above.
        </p>
      </div>
      {showModal && (
        <PortfolioModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default PortfolioPage;
