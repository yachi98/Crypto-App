"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { getGraphData } from "@/redux/features/graphCoinSlice";
import { getSelectedCoinData } from "@/redux/features/selectedCoins";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [coin, setCoin] = useState("bitcoin");
  const { currency } = useAppSelector((state) => state.currencySlice);
  const { timeDay } = useAppSelector((state) => state.selectedCoinData);

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    dispatch(getGraphData({ coinId: coin }));
  }, [coin]);

  useEffect(() => {
    dispatch(getCoinData({ currency: currency }));
  }, [currency]);

  useEffect(() => {
    dispatch(
      getSelectedCoinData({
        coinId: coin,
        timeDay: timeDay,
        currency: currency,
      })
    );
  }, [coin, timeDay, currency]);

  return <main className="flex flex-col items-center justify-between"></main>;
};

export default Home;
