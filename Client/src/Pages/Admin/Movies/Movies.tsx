import Sidebar from "../../../Components/Admin/Common/SideBar/SideBar";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import "../../../tailwindStyle.css";

import Header from "../../../Components/Admin/Common/Header/Header";
import MoviesTable from "../../../Components/Admin/Table/MoviesTable";
import { getMoviesAdmin } from "../../../Contexts/Movies/Movie.service";
import { MovieTable } from "../../../Contexts/Movies/MovieInterface";
import Chart, { ChartData } from "../../../Components/Admin/Chart/Chart";
import Ranking from "../../../Components/Admin/Ranking/Ranking";

interface MoviesData {
  movies: MovieTable[];
  moviesPerCategory: ChartData[];
  top10MostViewed: MovieTable[];
  top10MostWatched: MovieTable[];
}

const MoviesPage: React.FC = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>();

  const fetchMovies = async () => {
    const data = await getMoviesAdmin();
    setMoviesData(data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="flex h-[100%] w-[100%] relative section-overview flex-row">
        <Sidebar />
        <main
          className={`transition-all duration-300 ease-in-out ml-20 p-4 min-h-[100vh] w-[100%]`}
        >
          <Header title={"Filmes"} />
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-1 lg:grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Chart
              title="Filmes Por Categoria"
              chartData={moviesData?.moviesPerCategory}
            />
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Ranking
              title="Top 10 Mais Visualizados"
              top10MostViewed={moviesData?.top10MostViewed}
            />
            <Ranking
              title="Top 10 Com Mais Tempo Assistido"
              top10MostViewed={moviesData?.top10MostWatched}
            />
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-1 lg:grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <MoviesTable
              movies={moviesData?.movies}
              fetchMovies={fetchMovies}
            />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default MoviesPage;
