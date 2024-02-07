const CoinGraphChart = () => {
  return (
    <div className="flex gap-3 mt-4">
      <div className="w-[50%] h-[500px] bg-black rounded-2xl">
        <h2 className="text-[#DEDEDE] text-xl p-6 mt-3">Bitcoin(BTC)</h2>
      </div>
      <div className="w-[50%] h-[500px] bg-black rounded-2xl">
        <h2 className="text-[#DEDEDE] text-xl p-6 mt-3">Volume 24h</h2>
      </div>
    </div>
  );
};

export default CoinGraphChart;
