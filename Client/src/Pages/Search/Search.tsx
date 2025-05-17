import { useLocation } from "react-router-dom";
import BannerSearch from "../../Components/BannerSearch/BannerSearch";
import Footer from "../../Components/Footer/Footer";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Header from "../../Components/Header/Header";
import { imagesbanner } from "../../Utils/BannerImages";
import { useEffect, useState } from "react";
import CardMovie from "../../Components/CardMovie/CardMovie";
import "./SearchStyle.css";
import Loading from "../../Components/Loading/Loading";
import { useMovies } from "../../Contexts/Movies/useMovies";
import { Movie } from "../../Contexts/Movies/MovieInterface";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Search: React.FC = () => {
  const location = useLocation();
  const { termo } = location.state || {};
  const { moviesNoCategory, fetchMovies } = useMovies();
  const [moviesSearch, setMoviesSearch] = useState<Movie[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const paginate = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return moviesSearch?.slice(startIndex, endIndex);
  };
  const totalPages = Math.ceil(moviesSearch.length / itemsPerPage);

  const filterMovies = async () => {
    setIsloading(true);
    await fetchMovies();
    setMoviesSearch(moviesNoCategory);
    setIsloading(false);
  };

  useEffect(() => {
    filterMovies();
  }, []);

  return (
    <>
      <GeneralSection>
        <Header />
        <BannerSearch
          images={imagesbanner}
          text={termo}
          movies={moviesNoCategory}
          setMoviesSearch={setMoviesSearch}
          setCurrentPage={setCurrentPage}
          setIsloading={setIsloading}
        />

        <section className="container-search">
          {isLoading ? (
            <Loading padding={300} color="red" size={100} />
          ) : moviesSearch?.length === 0 ? (
            <img src="/assets/404.png" alt="" />
          ) : (
            <>
              <div className="div-search-movies-paginate">
                {paginate()?.map((movie) => {
                  return <CardMovie key={movie.id} movie={movie} />;
                })}
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <button
                  className="px-3 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
          )}
        </section>

        <Footer />
      </GeneralSection>
    </>
  );
};

export default Search;
