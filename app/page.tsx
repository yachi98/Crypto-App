"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { getGraphData } from "@/redux/features/graphCoinSlice";
import { getSelectedCoinData } from "@/redux/features/selectedCoins";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [coin, setCoin] = useState("bitcoin");

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    dispatch(getCoinData({ currency: "usd" }));
  }, []);

  useEffect(() => {
    dispatch(getGraphData({ coinId: coin }));
  }, [coin]);

  useEffect(() => {
    dispatch(getSelectedCoinData({ coinId: coin, timeDay: "1" }));
  }, [coin]);

  return <main className="flex flex-col items-center justify-between"></main>;
};

export default Home;
