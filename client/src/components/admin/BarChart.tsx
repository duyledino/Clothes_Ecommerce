import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type BestCustomer = {
  id: string;
  name: string;
  email: string;
  total: number;
};

type BarChartArr = {
  bestCustomer: BestCustomer[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: "Top 3 Customer",
    },
  },
};

export function BarChart({ bestCustomer }: BarChartArr) {
  const labels = bestCustomer.map((item) => item.email);
  const data = {
    labels,
    datasets: [
      {
        label: "User's Budget",
        data: bestCustomer.map((item) => item.total),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
