"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface TimeSelectorItem {
  value: string;
  days: string;
}

const timeSelector: TimeSelectorItem[] = [
  {
    value: "1D",
    days: "1",
  },
  {
    value: "7D",
    days: "7",
  },
  {
    value: "14D",
    days: "14",
  },
  {
    value: "1M",
    days: "30",
  },
  {
    value: "1Y",
    days: "365",
  },
  {
    value: "5Y",
    days: "1825",
  },
];

const TimeSelectorBar = () => {
  const [selectedTime, setSelectedTime] = useState("1");

  const handleTimeSelect = (days: string) => {
    setSelectedTime(days);
  };

  return (
    <div className="bg-black flex gap-8 text-xs justify-center p-2 rounded-2xl mt-3">
      {timeSelector.map((timeSelectorItem) => (
        <motion.button
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          key={timeSelectorItem.value}
          onClick={() => handleTimeSelect(timeSelectorItem.days)}
          className={`p-1  rounded-3xl w-[50px] ${
            selectedTime === timeSelectorItem.days
              ? "bg-white text-black"
              : "bg-transparent text-white"
          } rounded-md mr-2 last:mr-0`}
        >
          {timeSelectorItem.value}
        </motion.button>
      ))}
    </div>
  );
};

export default TimeSelectorBar;
