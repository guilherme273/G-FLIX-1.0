import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../../../tailwindStyle.css";
import Header from "../../../Components/Admin/Common/Header/Header";
import Chart, { ChartData } from "../../../Components/Admin/Chart/Chart";
import { getViews } from "../../../Modules/Views/Views.service";
import LineChartComponent, {
  DataLineChart,
} from "../../../Components/Admin/LineChart/LineChart";

interface ViewsData {
  viewsPerCategory: ChartData[];
  secondsWatchedPerCategory: ChartData[];
  minutesForDay: DataLineChart[];
}

const ViewsPage: React.FC = () => {
  const [viewsData, setViewsData] = useState<ViewsData>();

  const fetchViews = async () => {
    const data = await getViews();
    console.log(data);
    setViewsData(data);
  };
  useEffect(() => {
    fetchViews();
  }, []);

  return (
    <>
      <div className="flex h-[100%] w-[100%] relative section-overview flex-row">
        <Sidebar />
        <main
          className={`transition-all duration-300 ease-in-out ml-20 p-4 min-h-[100vh] w-[100%]`}
        >
          <Header title={"Visualizações"} />

          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-1 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Chart
              chartData={viewsData?.viewsPerCategory}
              title="Visualizações por Categoria"
            />
            <Chart
              chartData={viewsData?.secondsWatchedPerCategory}
              title="Tempo Assistido por categoria"
            />
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-1 lg:grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <LineChartComponent
              data={viewsData?.minutesForDay}
              title={"Minutos Assistidos Por Dia"}
            />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default ViewsPage;
