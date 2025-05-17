import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../../../tailwindStyle.css";
import Header from "../../../Components/Admin/Common/Header/Header";

import CategoriesTable from "../../../Components/Admin/Table/CategoriesTable";
import { CategoryPage } from "../../../Modules/Categories/CategoriesInterface";
import { getCategoriesPage } from "../../../Modules/Categories/Categories.service";

interface CategoriesData {
  categories: CategoryPage[];
}

const CategoriesPage: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<CategoriesData>();

  const fetchCategories = async () => {
    const data = await getCategoriesPage();
    setCategoriesData(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    console.log(categoriesData);
  }, [categoriesData]);

  return (
    <>
      <div className="flex h-[100%] w-[100%] relative section-overview flex-row">
        <Sidebar />
        <main
          className={`transition-all duration-300 ease-in-out ml-20 p-4 min-h-[100vh] w-[100%]`}
        >
          <Header title={"Categorias"} />

          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-1 lg:grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <CategoriesTable
              categories={categoriesData?.categories}
              fetchCategories={fetchCategories}
            />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default CategoriesPage;
