import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, Search, Trash2 } from "lucide-react";
import {
  CategoryPage,
  MovieToCategoryPage,
} from "../../../Modules/Categories/CategoriesInterface";
import { delCategory } from "../../../Modules/Categories/Categories.service";
import Loading from "../../Loading/Loading";
import Confirm from "../../Confirm/Confirm";
import Modal from "../../Modal/Modal";
import FormAddCategory from "../Forms/Category/FormAddCategory";
import { formatTime } from "../../../Utils/FormatTime";

interface TableProps {
  categories: CategoryPage[] | undefined;
  fetchCategories: () => Promise<void>;
}

const CategoriesTable: React.FC<TableProps> = ({
  categories,
  fetchCategories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategoryes, setFilteredCategoryes] = useState<CategoryPage[]>(
    []
  );
  const [openConfirmDel, setOpenConfirmDel] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (categories) setFilteredCategoryes(categories);
  }, [categories]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = categories?.filter((category) =>
      category.name.toLowerCase().includes(term)
    );
    setFilteredCategoryes(filtered || []);
    setCurrentPage(1);
  };

  const paginateCategories = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCategoryes?.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredCategoryes.length / itemsPerPage);

  const deleteCategory = (category_id: number) => {
    setCategoryToDelete(category_id);
    setOpenConfirmDel(true);
  };

  const handleDeleteConfirm = async () => {
    if (categoryToDelete !== null) {
      await delCategory(categoryToDelete);
      setCategoryToDelete(null);
      await fetchCategories();
    }
  };

  const getTotalViews = (movies: MovieToCategoryPage[]) =>
    movies.reduce((total, movie) => total + movie.views.length, 0);

  const getTime = (movies: MovieToCategoryPage[]) => {
    const totalSeconds = movies.reduce(
      (sum, movie) =>
        sum +
        movie.views.reduce((vSum, view) => vSum + view.seconds_watched, 0),
      0
    );
    return formatTime(totalSeconds);
  };

  return (
    <>
      <motion.div
        className="p-6 border shadow-lg section-start-card backdrop-blur-md rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {categories ? (
          <>
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Buscar categoria..."
                  className="w-full py-2 pl-10 pr-4 text-white placeholder-gray-200 bg-gray-800 rounded-lg sm:w-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <div className="flex flex-row items-center justify-center gap-1">
                <button onClick={() => setIsOpenModalRegister(true)}>
                  <Plus className="w-[35px] h-[35px] text-lime-500 hover:text-lime-600" />
                </button>
                <strong className="text-gray-200">
                  Adicionar Nova Categoria
                </strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    {[
                      "Nome",
                      "Criado em",
                      "Filmes",
                      "Visualizações",
                      "Tempo Assistido",
                      "Ações",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase"
                      >
                        {header}
                      </th>
                    ))}
                    <th className="px-6 py-3" />
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {paginateCategories()?.map((category) => (
                    <motion.tr
                      key={category.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {new Date(category.createdAt).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {category.movies.length}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {getTotalViews(category.movies)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {getTime(category.movies)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <button
                          onClick={() => deleteCategory(category.id)}
                          title="Deletar"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="px-3 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ArrowLeft />
              </button>
              <span className="px-2 text-sm text-gray-300">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="px-3 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ArrowRight />
              </button>
            </div>
          </>
        ) : (
          <Loading color="red" size={50} padding={10} />
        )}
      </motion.div>

      {openConfirmDel && (
        <Confirm
          setOpenConfirm={setOpenConfirmDel}
          onConfirm={handleDeleteConfirm}
          mensagem="Tem certeza que deseja excluir esta categoria?"
        />
      )}

      {isOpenModalRegister && (
        <Modal
          title={"Adicionar Categoria"}
          setIsOpenModal={setIsOpenModalRegister}
        >
          <FormAddCategory fetch={fetchCategories} />
        </Modal>
      )}
    </>
  );
};

export default CategoriesTable;
