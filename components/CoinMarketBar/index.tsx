const CoinMarketBar = ({
  fill,
  percentage,
}: {
  fill: string;
  percentage: number;
}) => {
  const clampedPercentage = Math.max(0, Math.min(percentage, 100));

  return (
    <div className="w-[180px] relative">
      <span
        className={`rounded-[6px] h-[3px] block ${fill} opacity-40 relative`}
      ></span>
      <span
        className={`w-full h-[3px] absolute left-0 top-0 rounded-[6px] ${fill}`}
        style={{
          width: `${clampedPercentage}%`,
        }}
      ></span>
    </div>
  );
};

export default CoinMarketBar;
