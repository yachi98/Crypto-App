"use client";

import CoinConverterPage from "@/components/CoinConverterPage";
import CoinGraphChart from "@/components/CoinGraphChart";
import CoinMarketTable from "@/components/CoinMarketTable";
import PriceChart from "@/components/PriceChart";
import CoinIcon from "@/public/CoinIcon.svg";
import GraphIcon from "@/public/GraphIcon.svg";
import { clearCoinData, getCoinData } from "@/redux/features/coinMarketSlice";
import { getGlobalData } from "@/redux/features/globalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const [showConverter, setShowConverter] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useAppSelector((state) => state.currencySlice);
  const { currentPage, coinMarketData } = useAppSelector(
    (state) => state.coinMarketData
  );

  useEffect(() => {
    dispatch(getGlobalData());
    dispatch(getCoinData({ currency: currency, page: 1 }));
  }, [currency]);

  useEffect(() => {
    return () => {
      dispatch(clearCoinData());
      dispatch(getCoinData({ currency: currency, page: 1 }));
    };
  }, [currency]);

  return (
    <main>
      {!showConverter && coinMarketData.length > 0 && <PriceChart />}
      <div className="dark:bg-[#0d121d] bg-white dark:text-white text-black p-1 rounded-xl w-[180px] flex items-center mt-5 text-xs">
        <button
          onClick={() => setShowConverter(!showConverter)}
          className={`${
            !showConverter && "dark:bg-gray-900 bg-[#efefef] rounded-xl"
          } opacity-70 p-2 mr-2 rounded-2xl w-[90px] flex gap-1`}
        >
          <CoinIcon />
          Coins
        </button>
        <button
          onClick={() => setShowConverter(!showConverter)}
          className={`${
            showConverter && "dark:bg-gray-900 bg-[#efefef] rounded-xl"
          } opacity-70 p-2 rounded-2xl w-[90px] flex gap-1`}
        >
          <GraphIcon />
          Converter
        </button>
      </div>
      {showConverter && <CoinConverterPage />}
      {!showConverter && <CoinGraphChart />}
      <CoinMarketTable />
    </main>
  );
};

export default Home;
