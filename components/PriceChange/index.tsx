import CaretIcon from "@/public/CaretIcon.svg";

const PriceChange = ({ price }: { price: number }) => {
  const isPositive: boolean = price >= 0;

  return (
    <div className="flex items-center">
      <CaretIcon
        className={`w-[0.5rem] h-[0.5rem] ${
          isPositive ? "fill-[#00B1A7]" : "fill-[#FE2264] rotate-180"
        }`}
      />
      <span
        className={` text-xs ml-1 ${
          isPositive ? "text-[#00B1A7]" : "text-[#FE2264]"
        }`}
      >
        {price}%
      </span>
    </div>
  );
};

export default PriceChange;
