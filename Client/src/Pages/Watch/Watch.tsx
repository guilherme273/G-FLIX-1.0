import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Eye, Star } from "lucide-react";
import Footer from "../../Components/Footer/Footer";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Header from "../../Components/Header/Header";
import Reactions from "../../Components/Reactions/Reactions";
import "./WatchStyle.css";
import { addOrRemoveToFavorites } from "../../Modules/Favorites/Favorites.service";
import { useAuth } from "../../Contexts/Auth/UseAuth";
import { useMovies } from "../../Contexts/Movies/useMovies";
import Loading from "../../Components/Loading/Loading";
import { Movie } from "../../Contexts/Movies/MovieInterface";
import SectionCarousel from "../../Components/SectionCarousel/SectionCarousel";
import MovieWatch from "../../Components/MovieWatch/MovieWatch";

const Watch: React.FC = () => {
  const { id, category_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const {
    fetchFavorites,
    getMovie,
    moviesNoCategory,
    getMoviesForCategory,
    getFavoritesOfSomeMovie,
  } = useMovies();
  const moviesThisCategory = getMoviesForCategory(Number(category_id));
  const { getUserID } = useAuth();

  // Atualiza o filme sempre que o ID mudar
  useEffect(() => {
    if (id) {
      const foundMovie = getMovie(Number(id));
      setMovie(foundMovie);
    }
  }, [id, moviesNoCategory]);

  const favorites = getFavoritesOfSomeMovie(Number(id));
  const isFavorited = favorites?.some(
    (favorite) => favorite.id_user === getUserID()
  );

  const addFavorites = async (id_movie: number) => {
    setIsLoading(true);
    await addOrRemoveToFavorites({ id_movie });
    await fetchFavorites();
    setIsLoading(false);
  };

  return (
    <GeneralSection>
      <Header />
      <section className="container-watch-page">
        <section className="watch-page">
          {movie ? (
            <div className="video-container">
              <div className="views-count-watch">
                <p className="views-count">
                  <Eye size={25} strokeWidth={1.1} color={"aliceblue"} />
                  {movie.views.length}{" "}
                  {`${
                    movie.views.length === 1 ? "Visualização" : "Visualizações"
                  } `}
                </p>
              </div>
              <MovieWatch movie={movie} />
              <div className="reactions-container">
                <div>
                  <Reactions movie={movie} />
                </div>

                <div>
                  {isLoading ? (
                    <Loading color={"red"} size={20} padding={5} />
                  ) : isFavorited ? (
                    <img
                      title="Remover da lista de favoritos"
                      onClick={() => addFavorites(movie.id)}
                      className="icon-favoritos"
                      src="/assets/star.png"
                      alt=""
                    />
                  ) : (
                    <Star
                      onClick={() => addFavorites(movie.id)}
                      className="icon-favoritos"
                    >
                      <title>Adicionar a lista de favoritos</title>
                    </Star>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Loading color="red" size={200} padding={100} />
          )}
        </section>
        <h5 className="title-carousel-watch">Filmes da mesma categoria</h5>
        <SectionCarousel movies={moviesThisCategory} />
      </section>
      <Footer />
    </GeneralSection>
  );
};

export default Watch;
