"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { getSelectedCoinData } from "@/redux/features/selectedCoins";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { coinId, timeDay } = useAppSelector((state) => state.selectedCoinData);
  const { currency } = useAppSelector((state) => state.currencySlice);

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    dispatch(getCoinData({ currency: currency }));
  }, [currency]);

  useEffect(() => {
    dispatch(
      getSelectedCoinData({
        coinId: coinId,
        timeDay: timeDay,
        currency: currency,
      })
    );
  }, [coinId, timeDay, currency]);

  return <main className="flex flex-col items-center justify-between"></main>;
};

export default Home;
