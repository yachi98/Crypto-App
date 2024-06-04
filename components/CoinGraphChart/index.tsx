"use client";

import { Coin } from "@/interfaces/coin.interface";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TimeSelectorBar from "../TimeSelector";
import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { getSelectedCoinData } from "@/redux/features/selectedCoins";
import { labelFormatter } from "@/redux/features/dateFormatter";
import formatDateGraph from "@/utils/formatDateGraph";
import formatNumber from "@/utils/formatNumber";
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  Tooltip,
  ScriptableContext,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  Tooltip
);

const options = {
  responsive: true,
  tooltip: { enabled: true },
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem: any) {
          let value = tooltipItem.dataset.data[tooltipItem.dataIndex];
          value =
            value < 10
              ? value.toPrecision(7)
              : value.toFixed(2).toLocaleString();
          return value;
        },
        labelColor: function () {
          return {
            borderRadius: 2,
            backgroundColor: "rgba(159, 122, 234)",
          };
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        color: "grey",
        maxTicksLimit: 10,
        align: "inner",
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

  gradientFill.addColorStop(0, "rgba(116, 116, 250, 0.4)");
  gradientFill.addColorStop(0.7, "rgba(116, 116, 250, 0.1)");
  gradientFill.addColorStop(1, "transparent");

  return gradientFill;
};

const CoinLineGraph = ({
  coins,
  days,
}: {
  coins: SelectedCoin[];
  days: string;
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const data = {
    labels: labelFormatter(coins[0].priceLabels, days),
    datasets: [
      {
        data: coins[0].prices,
        borderColor: "rgba(174, 139, 245)",
        backgroundColor: getBackgroundColor,
        borderWidth: 1,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
      },
      {
        data: coins[1]?.prices || [],
        borderColor: "rgba(255, 139, 245)",
        backgroundColor: getBackgroundColor,
        borderWidth: 1,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
      },
      {
        data: coins[2]?.prices || [],
        borderColor: "rgba(255, 255, 245)",
        backgroundColor: getBackgroundColor,
        borderWidth: 1,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
      },
    ],
  };
  useEffect(() => {
    setTimeout(() => {
      setShouldRender(true);
    }, 1000);
  }, []);

  return (
    <div className="h-full w-full">
      {shouldRender && <Line options={options as any} data={data} />}
    </div>
  );
};

const CoinBarGraph = ({
  coins,
  days,
}: {
  coins: SelectedCoin[];
  days: string;
}) => {
  const data = {
    labels: labelFormatter(coins[0].volumeLabels, days),
    datasets: [
      {
        data: coins[0].total_volumes,
        borderColor: "rgba(174, 139, 245)",
        backgroundColor: "rgba(174, 139, 245)",
        borderWidth: 8,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
      },
      {
        data: coins[1]?.total_volumes,
        borderColor: "rgba(255, 139, 245)",
        backgroundColor: "rgba(255, 139, 245)",
        borderWidth: 8,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
      },
      {
        data: coins[2]?.total_volumes,
        borderColor: "rgba(255, 255, 245)",
        backgroundColor: "rgba(255, 255, 245)",
        borderWidth: 8,
        pointRadius: 0,
        fill: true,
        tension: 0.8,
      },
    ],
  };

  return <Bar options={options as any} data={data as any} />;
};

const CoinGraphChart = () => {
  const dispatch: AppDispatch = useDispatch();
  const { coinId, selectedCoins, timeDay } = useAppSelector(
    (state) => state.selectedCoinData
  );
  const { currency, symbol } = useAppSelector((state) => state.currencySlice);
  // const selectedCoin = selectedCoins.length > 0 ? selectedCoins[0] : null;

  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);

  const selectedCoinsInfo: Coin[] = selectedCoins.reduce(
    (acc: Coin[], curr: SelectedCoin) => {
      const coinInfo = coinMarketData.find((coin: Coin) => coin.id === curr.id);
      return coinInfo ? [...acc, coinInfo] : acc;
    },
    []
  );

  // console.log("selectedCoins:", selectedCoins);

  const coinBG: string[] = ["bg-orange-300", "bg-[#7878FA]", "bg-[#D878FA]"];

  useEffect(() => {
    if (selectedCoinsInfo.length > 0) {
      return;
    }
    dispatch(
      getSelectedCoinData({
        coinId: coinId,
        timeDay: timeDay,
        currency: currency,
      })
    );
  }, [coinId, timeDay, currency]);

  function renderInfo(name: string) {
    return (
      <span>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</span>
    );
  }

  return (
    <div className="flex mt-2">
      <div className="dark:bg-gradient-to-r from-black to-gray-900 bg-white rounded-2xl w-1/2 h-[400px] m-2 flex flex-col p-6 relative">
        {selectedCoinsInfo.length > 0 && (
          <div className="flex flex-col gap-8">
            <div className="flex gap-8">
              <span className="dark:text-[#DEDEDE] flex text-base gap-1 items-center">
                {renderInfo(selectedCoinsInfo[0].name)} (
                {selectedCoinsInfo[0].symbol.toUpperCase()})
              </span>
              {selectedCoinsInfo.map((selectedCoin, index) => (
                <div key={selectedCoin.id} className="flex gap-2 items-center">
                  <span
                    className={`${coinBG[index]} w-[12px] h-[12px] flex items-center justify-center rounded`}
                  ></span>
                  <span className="text-xs">{renderInfo(selectedCoin.id)}</span>
                  <span className="text-xs">
                    {symbol}
                    {formatNumber(selectedCoin.current_price)}
                  </span>
                </div>
              ))}
              <span className="dark:text-[#DEDEDE] text-sm text-black absolute right-4">
                {formatDateGraph}
              </span>
            </div>

            <span className="dark:text-[#DEDEDE] text-black text-3xl">
              {symbol}
              {formatNumber(selectedCoinsInfo[0].current_price)}
            </span>
          </div>
        )}
        {selectedCoinsInfo[0] && (
          <div className="w-[100%] h-[100%]">
            <CoinLineGraph days={timeDay} coins={selectedCoins} />
          </div>
        )}
      </div>

      <div className="dark:bg-gradient-to-r from-black to-gray-900 bg-white rounded-2xl w-1/2 h-[400px] m-2 flex flex-col p-4">
        {selectedCoins[0] && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <span className="dark:text-[#DEDEDE] text-black flex text-base">
                Volume 24h
              </span>
              <TimeSelectorBar />
            </div>
            <span className="dark:text-[#DEDEDE] text-black text-3xl">
              {symbol}
              {formatNumber(
                selectedCoins[0].total_volumes[
                  selectedCoins[0].total_volumes.length - 1
                ]
              )}
            </span>
          </div>
        )}
        {selectedCoinsInfo[0] && (
          <div className="w-[100%] h-[100%]">
            <CoinBarGraph days={timeDay} coins={selectedCoins} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinGraphChart;
