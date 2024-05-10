"use client";

import { useState, useEffect } from "react";
import PortfolioModal from "@/components/PortfolioModal";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Coin } from "@/interfaces/coin.interface";
import { getPortfolioData } from "@/redux/features/portfolioSlice";

const PortfolioPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    setShowModal(true);
  };

  const coinId = "bitcoin";

  useEffect(() => {
    dispatch(getPortfolioData(coinId));
  }, [coinId]);

  return (
    <div className="dark:bg-gray-950 bg-light-theme max-w-screen-2xl m-auto h-screen p-2 relative">
      <div className={` w-full h-full ${showModal ? "blur-2xl" : ""}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl mt-5">Portfolio</h2>
          <button
            onClick={() => handleClick()}
            className="p-5 dark:bg-gray-900 bg-white rounded-2xl text-md mt-5 w-[200px]"
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
