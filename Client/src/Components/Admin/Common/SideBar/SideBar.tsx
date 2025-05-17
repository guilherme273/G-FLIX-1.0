import {
  BarChart2,
  Clapperboard,
  Menu,
  ScanEye,
  Tags,
  Users,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./SideBarStyle.css";
import { useState } from "react";

const SIDEBAR_ITEMS = [
  {
    name: "Visão Geral",
    icon: BarChart2,
    color: "#6366f1",
    href: "/dashboard",
  },
  { name: "Usuários", icon: Users, color: "#EC4899", href: "/dashboard/users" },
  {
    name: "Filmes",
    icon: Clapperboard,
    color: "#8B5CF6",
    href: "/dashboard/movies",
  },
  {
    name: "Categorias",
    icon: Tags,
    color: "#10B981",
    href: "/dashboard/categories",
  },
  {
    name: "Visualizações",
    icon: ScanEye,
    color: "#3B82F6",
    href: "/dashboard/views",
  },
  // { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
  // { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  return (
    <motion.div
      className={`fixed h-[100vh] z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : " w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="flex flex-col justify-around h-full p-4 section-sidebar">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="flex-grow mt-8">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 mb-2 text-sm font-medium rounded-lg nav-sidebar">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
        <div className="logo-admin-sidebar">
          <Link to="/">
            <img
              src="/assets/logo-g.png"
              className={
                isSidebarOpen
                  ? "logo-menu-admin-open"
                  : "logo-menu-admin-closed"
              }
              alt=""
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default Sidebar;
