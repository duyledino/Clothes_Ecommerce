import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

type monthAndRevenue = {
  month: string;
  year: number;
  total: number;
};
type LineChartArr = {
  revenue: monthAndRevenue[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Revenue",
    },
  },
};

export function LineChart({ revenue }: LineChartArr) {
  const labels = revenue.map((item) => item.month);
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenue.map((item) => item.total),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
