const PercentageBar = ({
  fill,
  percentage,
}: {
  fill: string;
  percentage: number;
}) => {
  return (
    <div className="h-1 relative">
      <span
        className={`rounded-md h-1 block ${fill} opacity-40 relative`}
      ></span>
      <span
        className={`w-full h-1 absolute left-0 top-0 rounded-md ${fill}`}
        style={{ width: `${percentage}%` }}
      ></span>
    </div>
  );
};

export default PercentageBar;
