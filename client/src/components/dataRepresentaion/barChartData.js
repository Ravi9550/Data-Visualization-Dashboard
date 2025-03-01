import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { DataContext } from "../../services/api/dataContext.js";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MainChart = () => {
  const data = useContext(DataContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Intensity",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Relevance",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Likelihood",
        data: [],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const aggregatedData = data.reduce((acc, item) => {
        const sector = item.sector || "Unknown";
        if (!acc[sector]) {
          acc[sector] = { intensity: 0, relevance: 0, likelihood: 0, count: 0 };
        }
        acc[sector].intensity += parseInt(item.intensity) || 0;
        acc[sector].relevance += item.relevance || 0;
        acc[sector].likelihood += item.likelihood || 0;
        acc[sector].count += 1;
        return acc;
      }, {});

      const labels = Object.keys(aggregatedData);
      const intensityData = labels.map(
        (label) => aggregatedData[label].intensity / aggregatedData[label].count
      );
      const relevanceData = labels.map(
        (label) => aggregatedData[label].relevance / aggregatedData[label].count
      );
      const likelihoodData = labels.map(
        (label) =>
          aggregatedData[label].likelihood / aggregatedData[label].count
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Intensity",
            data: intensityData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Relevance",
            data: relevanceData,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
          {
            label: "Likelihood",
            data: likelihoodData,
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!data) {
    return (
      <div >
       No Data Present
      </div>
    );
  }
  return (
    <div style={({ display: "flex" }, { flexDirection: "column" })}>
      <h6 style={{ padding: "1em" }}>Sector</h6>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MainChart;
