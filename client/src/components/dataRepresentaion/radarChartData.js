import React, { useContext, useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { DataContext } from "../../services/api/dataContext.js";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const data = useContext(DataContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Aggregate data by sector (or you can choose topic, region, etc.)
      const aggregatedData = data.reduce((acc, item) => {
        const category = item.sector || "Unknown";
        if (!acc[category]) {
          acc[category] = {
            intensity: 0,
            relevance: 0,
            likelihood: 0,
            count: 0,
          };
        }
        acc[category].intensity += parseInt(item.intensity) || 0;
        acc[category].relevance += item.relevance || 0;
        acc[category].likelihood += item.likelihood || 0;
        acc[category].count += 1;
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
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
          },
          {
            label: "Relevance",
            data: relevanceData,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            pointBackgroundColor: "rgba(153, 102, 255, 1)",
            pointBorderColor: "#fff",
          },
          {
            label: "Likelihood",
            data: likelihoodData,
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            pointBackgroundColor: "rgba(255, 159, 64, 1)",
            pointBorderColor: "#fff",
          },
        ],
      });
    }
  }, [data]);

  const options = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          color: "#595959", // Change this to your desired color
        },
        pointLabels: {
          color: "#e4e4e4", // Change this to your desired color
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e4e4e4", // Change this to your desired color
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h6 style={{ padding: "1em" }}>
        Reports Distribution by Start and End Year
      </h6>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
