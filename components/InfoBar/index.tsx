"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGlobalData } from "@/redux/features/globalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import formatNumber from "@/utils/formatNumber";
import CoinIcon from "@/public/CoinIcon.svg";
import ConvertIcon from "@/public/ConvertIcon.svg";
import CaretIcon from "@/public/CaretIcon.svg";
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
    <div className="w-full flex items-center gap-x-10 p-4 justify-left z-10">
      <div className="flex items-center gap-1 dark:text-white text-black">
        <CoinIcon />
        <span className="dark:text-white text-black text-light-typo text-xs font-light">
          Active currencies: {globalData.active_cryptocurrencies}
        </span>
      </div>
      <div className="flex items-center gap-1 dark:text-white text-black">
        <ConvertIcon />
        <span className="dark:text-white text-black  text-xs font-light">
          Markets: {globalData.markets}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <CaretIcon />
        <span className="dark:text-white text-black  text-xs font-light">
          {formatNumber(globalData.total_volume.usd)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="dark:text-white text-black  text-xs font-light">
          ${formatNumber(globalData.total_market_cap.usd)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="dark:text-white text-black  text-xs">BTC</span>
        <span className="dark:text-white text-black  text-xs font-light">
          {Math.floor(btcPercentage)}%
        </span>
        <div className="w-20 ml-4">
          <PercentageBar
            fill="dark:bg-white bg-black"
            percentage={btcPercentage}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="dark:text-white text-xs ml-5">ETH</span>
        <span className="dark:text-white text-xs font-light">
          {Math.floor(ethPercentage)}%
        </span>
        <div className="w-20 ml-4">
          <PercentageBar
            fill="dark:bg-white bg-black"
            percentage={ethPercentage}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
