import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { MovieTable } from "../../../Contexts/Movies/MovieInterface";
import { delMovie } from "../../../Contexts/Movies/Movie.service";
import Loading from "../../Loading/Loading";
import Confirm from "../../Confirm/Confirm";
import Modal from "../../Modal/Modal";
import FormAddMovie from "../Forms/Movies/FormAddMovie";
import FormUpdateMovie from "../Forms/Movies/FormUpdateMovie";
import { timeWatchting } from "../../../Utils/FormatTime";

interface TableProps {
  movies: MovieTable[] | undefined;
  fetchMovies: () => Promise<void>;
}

const MoviesTable: React.FC<TableProps> = ({ movies, fetchMovies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<MovieTable[]>([]);
  const [openConfirmDel, setOpenConfirmDel] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<number | null>(null);
  const [movieToUpdate, setMovieToUpdate] = useState<MovieTable | null>(null);
  const [isOpenModalUpdateMovie, setIsOpenModalUpdateMovie] = useState(false);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (movies) setFilteredMovies(movies);
  }, [movies]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = movies?.filter((movie) =>
      movie.title.toLowerCase().includes(term)
    );
    setFilteredMovies(filtered || []);
    setCurrentPage(1);
  };

  const paginateMovies = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMovies.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const deleteMovie = (movie_id: number) => {
    setMovieToDelete(movie_id);
    setOpenConfirmDel(true);
  };

  const handleDeleteConfirm = async () => {
    if (movieToDelete !== null) {
      await delMovie(movieToDelete);
      setMovieToDelete(null);
      await fetchMovies();
    }
  };

  const uptadeMovie = (movie: MovieTable) => {
    setMovieToUpdate(movie);
    setIsOpenModalUpdateMovie(true);
  };

  return (
    <>
      <motion.div
        className="p-6 border shadow-lg section-start-card backdrop-blur-md rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {movies ? (
          <>
            {/* Search + Add Button */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Buscar Filme..."
                  className="w-full py-2 pl-10 pr-4 text-white placeholder-gray-200 bg-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
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
                <strong className="text-gray-200">Adicionar Novo Filme</strong>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    {[
                      "Title",
                      "Categoria",
                      "Visualizações",
                      "Reações",
                      "Favoritado por",
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
                  {paginateMovies().map((movie) => (
                    <motion.tr
                      key={movie.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 overflow-hidden rounded-full bg-gradient-to-r from-purple-400 to-blue-500">
                            <img
                              src={movie.cover}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="ml-4 text-sm font-medium text-gray-100">
                            {movie.title.split(" ").slice(0, 6).join(" ")}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {movie.category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {movie.views.length}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {movie.reactions.length}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {`${movie.favorites.length} ${
                          movie.favorites.length === 1 ? "Usuário" : "Usuários"
                        }`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {timeWatchting(movie.views)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <button
                          onClick={() => uptadeMovie(movie)}
                          title="Editar"
                          className="mr-2 text-yellow-400 hover:text-yellow-200"
                        >
                          <Pencil />
                        </button>
                        <button
                          onClick={() => deleteMovie(movie.id)}
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
          mensagem="Tem certeza que deseja excluir este filme?"
        />
      )}
      {isOpenModalRegister && (
        <Modal
          title="Adicionar Filme"
          children={<FormAddMovie fetch={fetchMovies} />}
          setIsOpenModal={setIsOpenModalRegister}
        />
      )}
      {isOpenModalUpdateMovie && (
        <Modal
          title="Editar Filme"
          children={
            <FormUpdateMovie movie={movieToUpdate} fetch={fetchMovies} />
          }
          setIsOpenModal={setIsOpenModalUpdateMovie}
        />
      )}
    </>
  );
};

export default MoviesTable;
