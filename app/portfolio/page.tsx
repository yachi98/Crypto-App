"use client";

import { useState } from "react";
import PortfolioModal from "@/components/PortfolioModal";

const PortfolioPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="dark:bg-gray-950 bg-light-theme max-w-screen-2xl m-auto h-screen p-2">
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
        Manage your crypto assets with ease! Whether you‘re a seasoned trader or
        just getting started in the exciting world of cryptocurrencies, this
        portfolio tool is designed to help you keep track of your investments
        effortlessly. You can add your coins by simply clicking on the Add Asset
        button above.
      </p>
      {showModal && <PortfolioModal />}
    </div>
  );
};

export default PortfolioPage;
