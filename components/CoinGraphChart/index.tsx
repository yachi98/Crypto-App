"use client";

import { useAppSelector } from "@/redux/store";
import { Coin } from "@/interfaces/coin.interface";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  ScriptableContext,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import getNumArray from "@/utils/getGraphArray";
import formatNumber from "@/utils/formatNumber";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement
);

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

  gradientFill.addColorStop(0, "rgba(0, 147, 176, 0.5)");
  gradientFill.addColorStop(0.7, "rgba(0, 147, 176, 0.1)");
  gradientFill.addColorStop(1, "transparent");
  return gradientFill;
};

const CoinLineGraph = ({ coin }: { coin: Coin }) => {
  const data = {
    labels: getNumArray(coin.prices.length),
    datasets: [
      {
        data: coin.prices,
        borderColor: "rgba(0, 147, 176, 0.5)",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
        backgroundColor: getBackgroundColor,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

const CoinBarGraph = ({ coin }: { coin: Coin }) => {
  const data = {
    labels: getNumArray(coin.prices.length),
    datasets: [
      {
        data: coin.prices,
        borderColor: "rgba(0, 147, 176, 0.5)",
        borderWidth: 1,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
        backgroundColor: getBackgroundColor,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

const CoinGraphChart = () => {
  const { selectedCoins } = useAppSelector((state) => state.selectedCoinData);
  const selectedCoin = selectedCoins.length > 0 ? selectedCoins[0] : null;

  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);
  const coinInfo = coinMarketData.find(
    (data) => selectedCoin && data.id === selectedCoin.id
  );

  const todayDate: string = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex gap-3 mt-4">
      <div className="w-[50%] h-[450px] bg-black rounded-2xl p-2">
        {coinInfo && (
          <div className="flex flex-col">
            <span className="px-1 text-[#DEDEDE] flex text-sm p-2">
              {coinInfo.name.charAt(0).toUpperCase() +
                coinInfo.name.slice(1).toLowerCase()}{" "}
              ({coinInfo.symbol.toUpperCase()})
            </span>
            <span className="w-[6%] px-1 text-[#DEDEDE] text-2xl">
              {formatNumber(coinInfo.current_price)}
            </span>
          </div>
        )}
        {selectedCoin && <CoinLineGraph coin={selectedCoin} />}
      </div>
      <div className="w-[50%] h-[450px] bg-black rounded-2xl p-2">
        <div className="flex flex-col">
          <span className="text-[#DEDEDE] text-sm p-2">Volume 24h</span>
          <span className="text-[#DEDEDE] text-sm p-2">{todayDate}</span>
        </div>
        {selectedCoin && <CoinBarGraph coin={selectedCoin} />}
      </div>
    </div>
  );
};

export default CoinGraphChart;
