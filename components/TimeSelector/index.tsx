"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changeTime } from "@/redux/features/selectedCoins";

interface TimeSelectorItem {
  value: string;
  days: string;
}

const timeSelector: TimeSelectorItem[] = [
  {
    value: "1d",
    days: "1",
  },
  {
    value: "7d",
    days: "7",
  },
  {
    value: "14d",
    days: "14",
  },
  {
    value: "1m",
    days: "30",
  },
  {
    value: "1y",
    days: "365",
  },
];

const TimeSelectorBar = () => {
  const [selectedTime, setSelectedTime] = useState("1");
  const dispatch: AppDispatch = useDispatch();

  const handleTimeSelect = (days: string) => {
    dispatch(changeTime(days));
    setSelectedTime(days);
  };

  return (
    <div className="flex gap-2 text-xs p-1">
      {timeSelector.map((timeSelectorItem) => (
        <motion.button
          key={timeSelectorItem.value}
          onClick={() => handleTimeSelect(timeSelectorItem.days)}
          className={`p-1 rounded-3xl border-none w-[50px]  ${
            selectedTime === timeSelectorItem.days
              ? "dark:bg-white dark:text-black bg-black text-white"
              : "bg-transparent text-grey"
          } rounded-md mr-2 last:mr-0`}
        >
          {timeSelectorItem.value}
        </motion.button>
      ))}
    </div>
  );
};

export default TimeSelectorBar;
