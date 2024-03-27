"use client";

import { useAppSelector } from "@/redux/store";
import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import TimeSelectorBar from "../TimeSelector";

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
        display: false,
        color: "#ffffff",
      },
      border: {
        display: true,
      },
      stacked: true,
    },
    y: {
      display: false,
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
  gradientFill.addColorStop(1, "rgba(159, 122, 234, 0.1)");
  gradientFill.addColorStop(0.7, "rgba(159, 122, 234, 0.1)");
  gradientFill.addColorStop(1, "transparent");
  return gradientFill;
};

const CoinLineGraph = ({ coin }: { coin: SelectedCoin }) => {
  const data = {
    labels: getNumArray(coin.prices.length),
    datasets: [
      {
        data: coin.prices,
        borderColor: "rgba(159, 122, 234)",
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

const CoinBarGraph = ({ coin }: { coin: SelectedCoin }) => {
  const data = {
    labels: getNumArray(coin.total_volumes.length),
    datasets: [
      {
        data: coin.total_volumes,
        borderColor: "rgba(159, 122, 234, 0.9)",
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
  const { symbol } = useAppSelector((state) => state.currencySlice);

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
    <div className="flex mt-2">
      <div className="dark:bg-gradient-to-r from-black to-gray-900 bg-white rounded-2xl w-1/2 aspect-w-16 aspect-h-9 m-2 flex flex-col p-6">
        {coinInfo && (
          <div className="flex flex-col gap-8">
            <span className="text-[#DEDEDE] flex text-base">
              {coinInfo.name.charAt(0).toUpperCase() +
                coinInfo.name.slice(1).toLowerCase()}{" "}
              ({coinInfo.symbol.toUpperCase()})
            </span>
            <span className="text-[#DEDEDE] text-3xl">
              {symbol}
              {formatNumber(coinInfo.current_price)}
            </span>
            <span className="text-[#DEDEDE] text-base">{todayDate}</span>
          </div>
        )}
        {selectedCoin && (
          <div className="w-[100%] h-[100%]">
            {" "}
            <CoinLineGraph coin={selectedCoin} />{" "}
          </div>
        )}
      </div>
      <div className="dark:bg-gradient-to-r from-black to-gray-900 bg-white rounded-2xl w-1/2 aspect-w-16 aspect-h-9 m-2 flex flex-col p-6">
        {selectedCoin && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <span className="text-[#DEDEDE] flex text-base">Volume 24h</span>
              <TimeSelectorBar />
            </div>
            <span className="text-[#DEDEDE] text-3xl">
              {symbol}
              {formatNumber(
                selectedCoin.total_volumes[
                  selectedCoin.total_volumes.length - 1
                ]
              )}
            </span>
            <span className="text-[#DEDEDE] text-base">{todayDate}</span>
          </div>
        )}
        {selectedCoin && (
          <div className="w-[100%] h-[100%]">
            <CoinBarGraph coin={selectedCoin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinGraphChart;
