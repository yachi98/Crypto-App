"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { getCoinData } from "@/redux/features/coinMarketSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import { useEffect } from "react";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  // const { allCoinsList } = useAppSelector(
  //   (state) => state.coinMarketData.allCoinsList
  // );

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);

  useEffect(() => {
    dispatch(getCoinData());
    // dispatch(getAllCoinsData());
  }, []);

  return <main className="flex flex-col items-center justify-between"></main>;
};

export default Home;
