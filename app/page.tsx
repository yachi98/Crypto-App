"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { getGraphData } from "@/redux/features/graphCoinSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    dispatch(getCoinData());
  }, []);

  useEffect(() => {
    dispatch(getGraphData());
  }, []);

  return <main className="flex flex-col items-center justify-between"></main>;
};

export default Home;
