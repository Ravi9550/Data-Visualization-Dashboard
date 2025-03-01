import React from "react";
import LineChartData from "../dataRepresentaion/lineChartData.js";
import PieChartData from "../dataRepresentaion/pieChartData.js";
import BarChart from "../dataRepresentaion/barChartData.js";
import RadarChartData from "../dataRepresentaion/radarChartData.js";
import ChartContainer from "./customContainer.js";

function customChartContainer() {
  return (
    <div className="chartWraper container">
      <div className="ChartContainerWrapper ">
        <div>
          <ChartContainer
            insideEliment={<RadarChartData />}
            isVisible={"none"}
            //   height={"400px"}
            width={"50%"}
            padding={0}
          />
          <ChartContainer
            insideEliment={<PieChartData />}
            isVisible={"none"}
            //   height={"400px"}
            width={"50%"}
            padding={0}
          />
        </div>
        <div>
          <ChartContainer
            insideEliment={<BarChart />}
            width={"100%"}
            isVisible={"none"}
            padding={0}
          />
          <ChartContainer
            insideEliment={<LineChartData />}
            width={"100%"}
            padding={0}
            isVisible={"none"}
          />
        </div>
      </div>
    </div>
  );
}

export default customChartContainer;
