import React, { useEffect, useState, useRef, useContext } from "react";
import { Line } from "react-chartjs-2";
import { DataContext } from "../../services/api/dataContext.js";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = useContext(DataContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Start Year Reports",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        pointRadius: 3,
        tension: 0.4,
      },
      {
        label: "End Year Reports",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        pointRadius: 3,
        tension: 0.4,
      },
    ],
  });

  const chartRef = useRef(null);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const aggregatedStartYearData = data.reduce((acc, item) => {
        const startYear = item.start_year || "Unknown";
        if (!acc[startYear]) {
          acc[startYear] = 0;
        }
        acc[startYear] += 1; // Count occurrences of each start_year
        return acc;
      }, {});

      const aggregatedEndYearData = data.reduce((acc, item) => {
        const endYear = item.end_year || "Unknown";
        if (!acc[endYear]) {
          acc[endYear] = 0;
        }
        acc[endYear] += 1; // Count occurrences of each end_year
        return acc;
      }, {});

      const labels = Array.from(
        new Set([
          ...Object.keys(aggregatedStartYearData),
          ...Object.keys(aggregatedEndYearData),
        ])
      ).sort();

      const startYearData = labels.map(
        (label) => aggregatedStartYearData[label] || 0
      );
      const endYearData = labels.map(
        (label) => aggregatedEndYearData[label] || 0
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Start Year Reports",
            data: startYearData,
            backgroundColor: "rgba(35, 167, 242,0.2)",
            borderColor: "rgb(35, 167, 242)",
            borderWidth: 1,
            pointRadius: 3,
            tension: 0.4,
          },
          {
            label: "End Year Reports",
            data: endYearData,
            backgroundColor: "rgba(255, 148, 250, 0.2)",
            borderColor: "rgb(255, 148, 250)",
            borderWidth: 1,
            pointRadius: 3,
            tension: 0.4,
          },
        ],
      });
    }

    return () => {
      // Clean up chart instance if it exists
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, [data]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
    <div style={({ display: "flex" }, { flexDirection: "column" })}>
      <h6 style={{ padding: "1em" }}>
        Reports Distribution by Start and End Year
      </h6>

      <Line data={chartData} options={options} ref={chartRef} />
    </div>
  );
};

export default LineChart;
