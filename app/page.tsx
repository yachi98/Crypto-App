"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { getGraphData } from "@/redux/features/graphCoinSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [coin, setCoin] = useState("bitcoin");

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    dispatch(getCoinData());
  }, []);

  useEffect(() => {
    dispatch(getGraphData({ coinId: coin }));
  }, [coin]);

  return <main className="flex flex-col items-center justify-between"></main>;
};

export default Home;
