"use client";

import { useAppSelector } from "@/redux/store";
import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import getNumArray from "@/utils/getGraphArray";
import getReducedArray from "@/utils/getGraphReducedArray";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const CoinPriceGraph = ({
  prices,
  total_volumes,
  reduceBy,
}: {
  prices: number[];
  total_volumes: number[];
  reduceBy: number;
}) => {
  const lineChartRef = useRef<ChartJS<"line", number[], string>>(null);
  const dataSet: number[] = getReducedArray(prices, reduceBy);

  console.log("collect", prices);

  const data = {
    labels: getNumArray(prices.length),
    datasets: [
      {
        data: prices,
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

  return <Line ref={lineChartRef} options={options} data={data} />;
};

const CoinGraphChart = () => {
  const { selectedCoins, timeDay } = useAppSelector(
    (state) => state.selectedCoinData
  );

  const selectedCoinPrices =
    selectedCoins.length > 0 ? selectedCoins[0].prices : [];

  return (
    <div className="flex gap-3 mt-4">
      <div className="w-[50%] h-[450px] bg-black rounded-2xl p-6">
        <CoinPriceGraph
          prices={selectedCoinPrices}
          total_volumes={[]}
          reduceBy={0}
        />
      </div>
      <div className="w-[50%] h-[450px] bg-black rounded-2xl">
        <h2 className="text-[#DEDEDE] text-xl p-6 mt-3">Volume 24h</h2>
      </div>
    </div>
  );
};

export default CoinGraphChart;
