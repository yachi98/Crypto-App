const MarketTableHeading = () => {
  return (
    <div className="dark:bg-black bg-white w-full flex dark:text-[#DEDEDE] text-black p-4 mb-2 rounded-2xl text-sm justify-around">
      <div className="hidden sm:block flex-none px-1 w-[2%]">#</div>
      <div className="flex-1 px-1 w-[2%] bg-red-500 md:w-[16%] xl:w-[12%]">
        Name
      </div>
      <div className="flex-1 px-1 w-[2%] bg-blue-500 md:w-[16%] xl:w-[8%]">
        Price
      </div>
      <div className="flex-1 hidden md:block px-1 w-[4%] md:w-[16% xl:w-[8%] bg-orange-500">
        1h%
      </div>
      <div className="flex-1 hidden md:block px-1 w-[4%] md:w-[16%] xl:w-[8%] bg-purple-600">
        24h%
      </div>
      <div className="flex-1 hidden xl:block px-1 w-[4%] bg-green-600 xl:w-[8%]">
        7d%
      </div>
      <div className="flex-1 hidden xl:block px-1 w-[6%] bg-yellow-500 xl:w-[8%]">
        24h Volume / Market Cap
      </div>
      <div className="flex-1 hidden xl:block px-1 w-[6%] bg-pink-500 xl:w-[8%]">
        Circulating / Total Supply
      </div>
      <div className="flex-1 px-1 w-[3%] md:w-[20%] bg-sky-400 xl:w-[12%]">
        Last 7d
      </div>
    </div>
  );
};

export default MarketTableHeading;
