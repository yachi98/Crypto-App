"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PriceChart from "@/components/PriceChart";
import CoinConverter from "@/components/CoinConverter";
import CoinConverterPage from "@/components/CoinConverterPage";
import CoinGraphChart from "@/components/CoinGraphChart";
import CoinMarketTable from "@/components/CoinMarketTable";
import CoinIcon from "@/public/CoinIcon.svg";
import GraphIcon from "@/public/GraphIcon.svg";

const Home = () => {
  const [showConverter, setShowConverter] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useAppSelector((state) => state.currencySlice);

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    dispatch(getCoinData({ currency: currency }));
  }, [currency]);

  return (
    <main>
      {!showConverter && <PriceChart />}

      <div className="dark:bg-gray-900 bg-white dark:text-white text-black p-1 rounded-xl w-[180px] flex mt-5 text-xs">
        <button
          onClick={() => setShowConverter(!showConverter)}
          className={`${
            !showConverter && "dark:bg-slate-800 bg-gray-300 rounded-xl"
          } opacity-70 p-2 mr-2 rounded-2xl w-[90px] flex gap-1`}
        >
          <CoinIcon />
          Coins
        </button>
        <button
          onClick={() => setShowConverter(!showConverter)}
          className={`${
            showConverter && "dark:bg-slate-800 bg-gray-300 rounded-xl"
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
