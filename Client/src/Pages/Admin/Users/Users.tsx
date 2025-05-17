import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";
import StatCard from "../../../Components/Admin/Common/StartCard/StartCard";
import { Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import "../../../tailwindStyle.css";
import { ChartData } from "../../../Components/Admin/Chart/Chart";
import Header from "../../../Components/Admin/Common/Header/Header";
import UsersTable from "../../../Components/Admin/Table/UsersTable";
import { User } from "../../../Modules/User/UserInterface";
import { getUsers } from "../../../Modules/User/User.Service";
import LineChartComponent, {
  DataLineChart,
} from "../../../Components/Admin/LineChart/LineChart";

export interface OverViewInterface {
  userscount: number;
  moviesCount: number;
  favoritesCount: number;
  reactionsCount: number;
  moviesPerCategory: ChartData[];
  viewsPerCategory: ChartData[];
}

export interface UserGrowthData {
  name: string;
  value: number;
}

export interface UserDataPage {
  users: User[];
  count: number;
  userGrowthData: DataLineChart[];
  countAdmin: number;
}

const UsersPage: React.FC = () => {
  const [usersData, setUsersData] = useState<UserDataPage>();

  const fetchUsers = async () => {
    const overview = await getUsers();
    console.log(overview.userGrowthData);
    setUsersData(overview);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    console.log(usersData);
  }, [usersData]);
  return (
    <>
      <div className="flex h-[100%] w-[100%] relative section-overview flex-row">
        <Sidebar />
        <main
          className={`transition-all duration-300 ease-in-out ml-20 p-4 min-h-[100vh] w-[100%]`}
        >
          <Header title={"Usuários"} />
          {/* Aqui vai seu conteúdo principal */}
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total de usuários"
              icon={Users}
              value={usersData?.count}
              color="#6366F1"
            />
            <StatCard
              name="Total Administradores"
              icon={Zap}
              value={usersData?.countAdmin}
              color="#8B5CF6"
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-1 lg:grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <LineChartComponent
              data={usersData?.userGrowthData}
              title={"Crescimento de usuários (Ultimos 12 meses)"}
            />
            <UsersTable fetchUsers={fetchUsers} users={usersData?.users} />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default UsersPage;
