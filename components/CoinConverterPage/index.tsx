"use client";

import Converter from "@/components/Converter";

const CoinConverterPage = () => {
  const todayDate: string = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-5">
      <h2>Online Currency Converter</h2>
      <span className="dark:text-[#DEDEDE] text-black text-base">
        {todayDate}
      </span>
      <Converter />
    </div>
  );
};

export default CoinConverterPage;
