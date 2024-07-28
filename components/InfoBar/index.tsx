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
    <div className="mx-auto flex items-center z-10 gap-6 pt-4 w-fit dark:text-white text-black text-xs font-light">
      <div className="flex items-center gap-1">
        <CoinIcon className="w-4 h-4" />
        <span className="text-light-typo">
          <span className="hidden sm:inline">Currencies:</span>{" "}
          {globalData.active_cryptocurrencies}
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-1 dark:text-white text-black">
        <ConvertIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Markets:</span> {globalData.markets}
      </div>
      <div className="flex items-center gap-1">
        <CaretIcon className="w-4 h-4" />
        {formatNumber(globalData.total_volume.usd)}
      </div>
      <div className="flex items-center gap-1">
        ${formatNumber(globalData.total_market_cap.usd)}
      </div>
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
        </svg>{" "}
        {Math.floor(btcPercentage)}%
        <div className="w-20 hidden sm:block">
          <PercentageBar
            fill="dark:bg-white bg-black"
            percentage={btcPercentage}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 32 32"
          className="w-4 h-4"
        >
          <path d="M15.927 23.959l-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0l-9.819 16.297 9.819 5.807 9.823-5.801z" />
        </svg>{" "}
        {Math.floor(ethPercentage)}%
        <div className="w-20 hidden sm:block">
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
