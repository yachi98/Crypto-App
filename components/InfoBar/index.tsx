"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGlobalData } from "@/redux/features/globalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import formatNumber from "@/utils/formatNumber";
import CoinIcon from "@/public/CoinIcon.svg";
import ConvertIcon from "@/public/convertIcon.svg";
import CaretIcon from "@/public/CaretIcon.svg";
import BitCoinIcon from "@/public/BitCoinIcon.svg";
import EthereumIcon from "@/public/EthereumIcon.svg";
import PercentageBar from "@/components/PercentageBar";

const InfoBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { globalData } = useAppSelector((state) => state.globalData);

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  const btcPercentage: number = Math.floor(
    globalData.market_cap_percentage.btc
  );
  const ethPercentage: number = Math.floor(
    globalData.market_cap_percentage.eth
  );

  return (
    <div className="w-full bg-zinc-950 flex items-center gap-x-16 p-4 h-[30px] justify-left mt-2">
      <div className="flex items-center gap-1">
        <CoinIcon />
        <span className="text-white text-xs font-light">
          Coins: {globalData.active_cryptocurrencies}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <ConvertIcon />
        <span className="text-white text-xs font-light">
          Exchange: {globalData.markets}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <CaretIcon />
        <span className="text-white text-xs font-light">
          {formatNumber(globalData.total_volume.usd)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-white text-xs font-light">
          ${formatNumber(globalData.total_market_cap.usd)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {/* <BitCoinIcon /> */}
        <span className="text-white text-xs">BTC</span>
        <span className="text-white text-xs font-light">
          {Math.floor(btcPercentage)}%
        </span>
        <div className="w-[50px] ml-1.5">
          <PercentageBar
            fill="bg-gradient-to-r from-purple-400 to-orange-300"
            percentage={btcPercentage}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* <EthereumIcon /> */}
        <span className="text-white text-xs">ETH</span>
        <span className="text-white text-xs font-light">
          {Math.floor(ethPercentage)}%
        </span>
        <div className="w-[50px] ml-1.5">
          <PercentageBar
            fill="bg-gradient-to-r from-purple-400 to-orange-300"
            percentage={ethPercentage}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
