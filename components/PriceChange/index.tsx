import CaretIcon from "@/public/CaretIcon.svg";

const PriceChange = ({ price }: { price: number }) => {
  const isPositive: boolean = price >= 0;

  return (
    <div className="flex items-center">
      <CaretIcon
        className={`w-[8px] h-[8px] ${
          isPositive ? "fill-[#00B1A7]" : "fill-[#FE2264] rotate-180"
        }`}
      />
      <span
        className={` text-sm ml-1 ${
          isPositive ? "text-[#00B1A7]" : "text-[#FE2264]"
        }`}
      >
        {price}%
      </span>
    </div>
  );
};

export default PriceChange;
