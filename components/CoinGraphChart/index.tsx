"use client";

import { useAppSelector } from "@/redux/store";
import { Coin } from "@/interfaces/coin.interface";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const CoinPriceGraph = ({ coin }: { coin: Coin }) => {
  console.log("prices", coin.prices);
  console.log("volumes", coin.total_volumes);

  const data = {
    labels: getNumArray(coin.prices.length),
    datasets: [
      {
        data: coin.prices,
        borderColor: "white",
        // backgroundColor: "white",
        borderWidth: 1,
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
          display: true,
        },
        stacked: true,
      },
      "y-axis-1": {
        display: false,
        beginAtZero: false,
      },
      "y-axis-2": {
        display: false,
        beginAtZero: true,
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
  const { selectedCoins } = useAppSelector((state) => state.selectedCoinData);
  const lineChartRef = useRef<ChartJS<"line", number[], string>>(null);
  const barChartRef = useRef<ChartJS<"bar", number[], string>>(null);

  const selectedCoin = selectedCoins.length > 0 ? selectedCoins[0] : null;

  return (
    <div className="flex gap-3 mt-4">
      <div className="w-[50%] h-[450px] bg-black rounded-2xl p-2">
        <h2 className="text-[#DEDEDE] text-xl p-6 mt-3">Volume 24h</h2>
        {selectedCoin && <CoinPriceGraph coin={selectedCoin} />}
      </div>
      <div className="w-[50%] h-[450px] bg-black rounded-2xl p-2">
        <h2 className="text-[#DEDEDE] text-xl p-6 mt-3">Volume 24h</h2>
      </div>
    </div>
  );
};

export default CoinGraphChart;
