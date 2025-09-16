import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type BestSeller = {
  id: string;
  price: number;
  count: number;
  title: string;
};

type DoughnutChartArr = {
  bestSeller: BestSeller[];
};

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ bestSeller }: DoughnutChartArr) {
  const data = {
    labels: bestSeller.map(item=>item.title),
    datasets: [
      {
        label: "# of Votes",
        data: bestSeller.map(item=>item.price*item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}
