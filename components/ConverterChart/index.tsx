"use client";

import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TimeSelectorBar from "../TimeSelector";
import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { getSelectedCoinData } from "@/redux/features/selectedCoins";
import { labelFormatter } from "@/redux/features/dateFormatter";
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
  ScriptableContext,
  Tooltip,
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

const CoinLineGraph = ({
  coin,
  days,
}: {
  coin: SelectedCoin;
  days: string;
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const data = {
    labels: labelFormatter(coin.priceLabels, days),
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

const ConverterChart = () => {
  const { selectedCoins } = useAppSelector((state) => state.selectedCoinData);
  const { symbol } = useAppSelector((state) => state.currencySlice);
  const dispatch: AppDispatch = useDispatch();
  const { coinId, timeDay } = useAppSelector((state) => state.selectedCoinData);
  const { currency } = useAppSelector((state) => state.currencySlice);

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

  useEffect(() => {
    dispatch(
      getSelectedCoinData({
        coinId: coinId,
        timeDay: timeDay,
        currency: currency,
      })
    );
  }, [coinId, timeDay, currency]);
  return (
    <div className="dark:bg-gradient-to-r from-black to-gray-900 bg-white h-[400px] w-full mt-5 rounded-2xl">
      <ConverterChart />
    </div>
  );
};

export default ConverterChart;
