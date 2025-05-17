import { useEffect, useState } from "react";
import BannerFavorites from "../../Components/BannerFavorites/BannerFavoritos";
import Footer from "../../Components/Footer/Footer";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Header from "../../Components/Header/Header";
import { imagesbannerfavorites } from "../../Utils/BannerImages";
import "./FavoritesStyle.css";
import Loading from "../../Components/Loading/Loading";
import CardMovie from "../../Components/CardMovie/CardMovie";
import { useMovies } from "../../Contexts/Movies/useMovies";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Favorites: React.FC = () => {
  const { fetchFavorites, favoritesUser, getMovie } = useMovies();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const paginate = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return favoritesUser?.slice(startIndex, endIndex);
  };
  const totalPages = Math.ceil(favoritesUser.length / itemsPerPage);

  const filterMovies = async () => {
    setIsloading(true);
    await fetchFavorites();
    setIsloading(false);
  };

  useEffect(() => {
    filterMovies();
  }, []);

  return (
    <>
      <GeneralSection>
        <Header />

        <BannerFavorites images={imagesbannerfavorites} />
        <section className="container-search">
          {isLoading ? (
            <Loading padding={300} color="red" size={100} />
          ) : favoritesUser.length === 0 ? (
            <h1 className="h1-no-favofites">
              Nenhum filme adicionado como favoritos no momento!
            </h1>
          ) : (
            <>
              <div className="div-search-movies-paginate">
                {paginate().map((favorite) => {
                  const movie = getMovie(favorite.id_movie);
                  return movie ? (
                    <CardMovie key={movie.id} movie={movie} />
                  ) : null;
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

export default Favorites;
