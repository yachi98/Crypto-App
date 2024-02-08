"use client";

import MarketTableHeading from "../MarketTableHeading";

import { useAppSelector } from "@/redux/store";
import { Coin } from "@/interfaces/coin.interface";

const CoinGraphChart = () => {
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);
  return (
    <div className="flex gap-3 mt-4">
      <div className="w-[50%] h-[500px] bg-black rounded-2xl">
        {/* {coinMarketData.map((coin: Coin) => (
          // <h3 key={coin.id} className="text-[#DEDEDE] text-xl p-6 mt-3">
          //   {coin.name}
          // </h3>
          <span
            key={coin.id}
            className="w-[14%] px-1 text-[#DEDEDE] text-2xl p-6 mt-3"
          >
            {coin.name.charAt(0).toUpperCase() +
              coin.name.slice(1).toLowerCase()}{" "}
            ({coin.symbol.toUpperCase()})
          </span>
        ))} */}
      </div>
      <div className="w-[50%] h-[500px] bg-black rounded-2xl">
        <h2 className="text-[#DEDEDE] text-xl p-6 mt-3">Volume 24h</h2>
      </div>
    </div>
  );
};

export default CoinGraphChart;
