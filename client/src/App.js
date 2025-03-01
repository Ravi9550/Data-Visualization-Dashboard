import "./App.css";
import Sidenav from "./components/sidenav.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import ChartContainer from "./components/ui/customContainer.js";
import TestTable from "./components/dataRepresentaion/tableData.js";
import IntroSection from "./components/introSection.js";
import MapData from "./components/dataRepresentaion/mapData.js";
import CustomChartContainer from "./components/ui/customChartContainer.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidenav />
      <IntroSection />
      <CustomChartContainer />
      <ChartContainer
        alowHeading={true}
        heading={"The reports over the World"}
        subheading={"Click on the disk to find the reports in that country."}
        insideEliment={<MapData />}
        width={"100%"}
      />
      <ChartContainer
        alowHeading={true}
        heading={"This is the representation of all data"}
        subheading={"Filter data by clicking on the filter icon."}
        insideEliment={<TestTable />}
        width={"100%"}
      />
      <Footer />
    </div>
  );
}

export default App;
