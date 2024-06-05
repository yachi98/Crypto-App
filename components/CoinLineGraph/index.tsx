import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { labelFormatter } from "@/redux/features/dateFormatter";
import formatNumber from "@/utils/formatNumber";
import backgroundColor from "@/utils/backgroundColour";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

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
          const coinName = tooltipItem.dataset.label;
          return `${
            coinName.charAt(0).toUpperCase() + coinName.slice(1).toLowerCase()
          }: ${formatNumber(value)}`;
        },
        labelColor: function (tooltipItem: any) {
          const colors = [
            "rgba(174, 139, 245, 1)",
            "rgba(255, 139, 245, 1)",
            "rgba(253, 186, 116, 1)",
          ];
          return {
            borderRadius: 2,
            backgroundColor:
              colors[tooltipItem.datasetIndex] || "rgba(174, 139, 245, 1)",
          };
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        display: true,
        color: "grey",
        maxTicksLimit: 10,
        font: {
          size: 10,
        },
        align: "inner",
      },
      border: { display: true },
      stacked: true,
    },
    y: { display: false },
  },
  pointRadius: 0,
  borderWidth: 0,
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
    datasets: coins.map((coin, index) => ({
      data: coin.prices,
      label: coin.id,
      borderColor: options.plugins.tooltip.callbacks.labelColor({
        datasetIndex: index,
      }).backgroundColor,
      backgroundColor: backgroundColor,
      borderWidth: 1,
      pointRadius: 0,
      fill: true,
      tension: 0.8,
    })),
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

export default CoinLineGraph;
