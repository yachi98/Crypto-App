import { SelectedCoin } from "@/interfaces/selectedcoin.interface";
import { labelFormatter } from "@/redux/features/dateFormatter";
import formatNumber from "@/utils/formatNumber";
import { Bar } from "react-chartjs-2";

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

const CoinBarGraph = ({
  coins,
  days,
}: {
  coins: SelectedCoin[];
  days: string;
}) => {
  const data = {
    labels: labelFormatter(coins[0].volumeLabels, days),
    datasets: coins.map((coin, index) => ({
      data: coin.total_volumes,
      label: coin.id,
      borderColor: options.plugins.tooltip.callbacks.labelColor({
        datasetIndex: index,
      }).backgroundColor,
      backgroundColor: options.plugins.tooltip.callbacks.labelColor({
        datasetIndex: index,
      }).backgroundColor,
      borderWidth: 8,
      pointRadius: 0,
      fill: true,
      tension: 0.8,
    })),
  };

  return <Bar options={options as any} data={data as any} />;
};

export default CoinBarGraph;
