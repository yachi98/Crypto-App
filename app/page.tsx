"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PriceChart from "@/components/PriceChart";
import CoinGraphChart from "@/components/CoinGraphChart";
import CoinMarketTable from "@/components/CoinMarketTable";

const Home = () => {
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
      <PriceChart />
      <CoinGraphChart />
      <CoinMarketTable />
    </main>
  );
};

export default Home;
