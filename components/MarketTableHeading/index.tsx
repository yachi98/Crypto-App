const MarketTableHeading = () => {
  return (
    <div className="bg-black w-full h-[700px] text-[#DEDEDE] text-sm font-light rounded-2xl p-5 flex gap-3">
      <span className="px-1">#</span>
      <span className="px-1 w-[16%]">Name</span>
      <span className="w-[6%] px-1">Price</span>
      <span className="w-[6%] px-1">1h%</span>
      <span className="w-[6%] px-1">24h%</span>
      <span className="w-[6%] px-1">7d%</span>
      <span className="w-full max-w-[18%] px-1">24h volume / Market Cap</span>
      <span className="w-full max-w-[18%] px-1">
        Circulating / Total Supply
      </span>
      <span>Last 7d</span>
    </div>
  );
};

export default MarketTableHeading;
