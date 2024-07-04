"use client";

import TimeIcon from "@/public/TimeIcon.svg";
import { changeTime } from "@/redux/features/selectedCoins";
import { AppDispatch } from "@/redux/store";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface TimeSelectorItem {
  value: string;
  days: string;
}

const timeSelector: TimeSelectorItem[] = [
  { value: "1d", days: "1" },
  { value: "7d", days: "7" },
  { value: "14d", days: "14" },
  { value: "1m", days: "30" },
  { value: "1y", days: "365" },
];

const TimeSelectorBar = () => {
  const [selectedTime, setSelectedTime] = useState("1");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleTimeSelect = (days: string) => {
    dispatch(changeTime(days));
    setSelectedTime(days);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`w-[90px] dark:bg-[#0d121d] bg-white p-2 rounded-xl text-xs dark:text-white text-black font-light flex gap-2 items-center justify-center ${
          showDropdown ? "rounded-bl-none rounded-br-none" : ""
        }`}
      >
        <TimeIcon width={17} height={17} />
        {timeSelector.find((item) => item.days === selectedTime)?.value}
        <span className="ml-2">&#9662;</span>
      </button>

      {showDropdown && (
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 backdrop-filter dark:bg-[#0d121d] bg-white backdrop-blur overflow-hidden z-30 gap-3 w-full flex flex-col justify-left rounded-b-xl p-3 dark:text-white text-black text-xs font-light"
        >
          {timeSelector.map((timeSelectorItem) => (
            <button
              onClick={() => handleTimeSelect(timeSelectorItem.days)}
              className={`text-xs text-left dark:text-[#a7a7a7] text-black dark:hover:text-white ${
                selectedTime === timeSelectorItem.days
                  ? "dark:text-white font-bold"
                  : ""
              }`}
              key={timeSelectorItem.value}
            >
              {timeSelectorItem.value}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TimeSelectorBar;
