"use client";

import { useAppSelector } from "@/redux/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ScriptableContext,
} from "chart.js";

import { Line } from "react-chartjs-2";
import getNumArray from "@/utils/getGraphArray";
import getReducedArray from "@/utils/getGraphReducedArray";
import { useRef } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const CoinPriceGraph = ({
  prices,
  priceChange,
  reduceBy,
}: {
  prices: number[];
  priceChange: number;
  reduceBy: number;
}) => {
  const dataSet: number[] = getReducedArray(prices, reduceBy);

  const getBackgroundColor = (
    context: ScriptableContext<"line">
  ): CanvasGradient => {
    const ctx: CanvasRenderingContext2D = context.chart.ctx;
    const height: number = ctx.canvas.clientHeight;
    const gradientFill: CanvasGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      height
    );

    gradientFill.addColorStop(1, "transparent");
    return gradientFill;
  };

  const data = {
    labels: getNumArray(dataSet.length),
    datasets: [
      {
        data: dataSet,
        borderColor: "white",
        backgroundColor: "white",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: "#ffffff",
        },
        border: {
          display: false,
        },
        stacked: true,
      },
      "y-axis-1": {
        display: false,
        beginAtZero: false,
      },
      "y-axis-2": {
        display: false,
        beginAtZero: false,
      },
      "y-axis-3": {
        display: false,
        beginAtZero: false,
      },
    },
    pointRadius: 0,
    borderWidth: 0,
  };

  return <Line options={options} data={data} />;
};

const CoinGraphChart = () => {
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);

  return (
    <div className="flex gap-3 mt-4">
      <div className="w-[50%] h-[450px] bg-black rounded-2xl">
        {/* {coinMarketData && coinMarketData.length && (
          <CoinPriceGraph
            prices={coin.current_price}
            priceChange={coinMarketData[0].priceChange}
            reduceBy={10}
          />
        )} */}
      </div>
      <div className="w-[50%] h-[450px] bg-black rounded-2xl">
        <h2 className="text-[#DEDEDE] text-xl p-6 mt-3">Volume 24h</h2>
        {/* <Bar
          prices={coinMarketData.map((coin) => coin.current_price)}
          options={options}
          data={barData}
        /> */}
      </div>
    </div>
  );
};

export default CoinGraphChart;

// {coinMarketData.map((coin: Coin) => (
//   <h3 key={coin.id} className="text-[#DEDEDE] text-xl p-6 mt-3">
//     {coin.name}
//   </h3>
//    ))}
