import React, { useContext, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { DataContext } from "../../services/api/dataContext.js"; // Update the path as necessary


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartReport = () => {
  const data = useContext(DataContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        border: "transparent",
      },
    ],
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const aggregatedData = data.reduce((acc, item) => {
        const pestle = item.pestle || "Unknown";
        if (!acc[pestle]) {
          acc[pestle] = 0;
        }
        acc[pestle] += 1; // Count occurrences of each pestle
        return acc;
      }, {});

      const labels = Object.keys(aggregatedData);
      const doughnutData = labels.map((label) => aggregatedData[label]);
      const backgroundColors = labels.map(
        (_, index) => `hsl(${index * 50}, 70%, 50%)`
      );
      const hoverBackgroundColors = labels.map(
        (_, index) => `hsl(${index * 50}, 70%, 40%)`
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            data: doughnutData,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: hoverBackgroundColors,
          },
        ],
      });
    }
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#e4e4e4" },
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      duration: 2000, // Animation duration in milliseconds
      easing: "easeInOutQuart", // Animation easing function
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
      <h6 style={{ padding: "1em" }}>PESTLE Distribution</h6>
      <Doughnut
        data={chartData}
        options={options}
        style={{ padding: "1em 0" }}
      />
    </div>
  );
};

export default DoughnutChartReport;
