"use client";

import { getGlobalData } from "@/redux/features/globalSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

import { useEffect } from "react";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getGlobalData());
  }, [dispatch]);

  return <main className="flex flex-col items-center justify-between"></main>;
};

export default Home;
