const MarketTableHeading = () => {
  return (
    <div className="dark:bg-black bg-white w-full flex dark:text-[#DEDEDE] text-black p-4 mb-2 rounded-2xl text-sm">
      <div className="hidden sm:block flex-none px-1">#</div>
      <div className="flex-1 px-1">Name</div>
      <div className="flex-1 px-1">Price</div>
      <div className="hidden sm:block flex-1 px-1 w-[10%]">1h%</div>
      <div className="hidden sm:block flex-1 px-1 w-[10%]">24h%</div>
      <div className="hidden sm:block flex-1 px-1 w-[10%]">7d%</div>
      <div className="hidden sm:block md:flex flex-2 px-1 w-[20%]">
        24h volume / Market Cap
      </div>
      <div className="hidden xl:flex flex-2 px-1 w-[20%]">
        Circulating / Total Supply
      </div>
      <div className="flex-2 px-1">Last 7d</div>
    </div>
  );
};

export default MarketTableHeading;
