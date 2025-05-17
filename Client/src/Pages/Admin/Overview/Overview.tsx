import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";
import StatCard from "../../../Components/Admin/Common/StartCard/StartCard";
// import FormAddMovie from "../../../Components/Admin/Movies/FormAddMovie";
import { Clapperboard, Heart, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import "./OverviewStyle.css";
import "../../../tailwindStyle.css";
import { getOverView } from "../../../Modules/Admin/Admin.service";
import Chart, { ChartData } from "../../../Components/Admin/Chart/Chart";
import Header from "../../../Components/Admin/Common/Header/Header";

export interface OverViewInterface {
  userscount: number;
  moviesCount: number;
  favoritesCount: number;
  reactionsCount: number;
  moviesPerCategory: ChartData[];
  viewsPerCategory: ChartData[];
}

const Overview: React.FC = () => {
  const [overviewData, setOverviewData] = useState<OverViewInterface>();

  const fetchOverview = async () => {
    const overview = await getOverView();
    setOverviewData(overview);
  };
  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <>
      <div className="flex h-[100%] w-[100%] relative section-overview flex-row">
        <Sidebar />
        <main
          className={`transition-all duration-300 ease-in-out ml-20 p-4 min-h-[100vh] w-[100%]`}
        >
          <Header title={"Visão Geral"} />
          {/* Aqui vai seu conteúdo principal */}
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total de usuários"
              icon={Users}
              value={overviewData?.userscount}
              color="#6366F1"
            />
            <StatCard
              name="Total de filmes"
              icon={Clapperboard}
              value={overviewData?.moviesCount}
              color="#8B5CF6"
            />
            <StatCard
              name="Total adicionado aos favoritos"
              icon={Star}
              value={overviewData?.favoritesCount}
              color="#F59E0B"
            />
            <StatCard
              name="Total de Reações"
              icon={Heart}
              value={overviewData?.reactionsCount}
              color="#10B981"
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Chart
              title="Filmes Por Categoria"
              chartData={overviewData?.moviesPerCategory}
            />
            <Chart
              title="Visualizações Por Categoria"
              chartData={overviewData?.viewsPerCategory}
            />
            {/* <FormAddMovie /> */}
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Overview;
