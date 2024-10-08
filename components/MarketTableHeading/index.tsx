const MarketTableHeading = () => {
  return (
    <div className="dark:bg-black bg-white w-full flex dark:text-[#DEDEDE] text-black py-4 px-4 mb-2 rounded-2xl text-sm justify-around">
      <div className="hidden sm:block flex-none px-1 w-[2%]">#</div>
      <div className="px-1 w-1/3 md:w-[16%] xl:w-[8%]">Name</div>
      <div className="flex-1 px-1 w-1/3 md:w-[16%] xl:w-[8%]">Price</div>
      <div className="flex-1 hidden md:block px-1 w-[2%] md:w-[16%] xl:w-[8%]">
        1h%
      </div>
      <div className="flex-1 hidden md:block px-1 w-[2%] md:w-[16%] xl:w-[8%]">
        24h%
      </div>
      <div className="flex-1 hidden md:block px-1 w-[2%] md:w-[16%] xl:w-[8%]">
        7d%
      </div>
      <div className="flex-1 hidden xl:block px-1 w-[2%] md:w-[16%] xl:w-[8%]">
        Market Cap
      </div>
      <div className="flex-1 hidden xl:block px-1 w-[2%] md:w-[16%] xl:w-[8%]">
        Total Supply
      </div>
      <div className="flex-1 px-1 w-1/3 md:w-[16%] xl:w-[8%]">Last 7d</div>
    </div>
  );
};

export default MarketTableHeading;
