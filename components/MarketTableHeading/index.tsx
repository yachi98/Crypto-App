const MarketTableHeading = () => {
  return (
    <div className=" dark:bg-black bg-white w-full dark:text-[#DEDEDE] text-black text-sm font-light rounded-2xl p-5 flex gap-3 mb-2">
      <span className="px-1">#</span>
      <span className="px-1 w-[16%]">Name</span>
      <span className="w-[6%] px-1">Price</span>
      <span className="w-[6%] px-1">1h%</span>
      <span className="w-[6%] px-1 hidden sm:inline">24h%</span>
      <span className="w-[6%] px-1 hidden sm:inline">7d%</span>
      <span className="w-full max-w-[20%] px-1 hidden md:inline">
        24h volume / Market Cap
      </span>
      <span className="w-full max-w-[20%] px-1 hidden xl:inline">
        Circulating / Total Supply
      </span>
      <span>Last 7d</span>
    </div>
  );
};

export default MarketTableHeading;
