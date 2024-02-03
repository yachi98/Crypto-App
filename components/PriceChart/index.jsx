"use client";

import PriceCoinItem from "../PriceCoinItem";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Coin } from "@/interfaces/coin.interface";
import { useState } from "react";

const PriceChart = () => {
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);

  const hasCoins = coinMarketData.length > 0;

  return (
    <div>
      <h1 className="text-white p-4 text-light">Price chart</h1>
      <div className="flex gap-2 p-2">
        {hasCoins &&
          coinMarketData.map((coin) => (
            <PriceCoinItem key={coin.id} coin={coin} className="mr-2" />
          ))}
      </div>
    </div>
  );
};

export default PriceChart;
