import { CirclePlay, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Movie } from "../../Contexts/Movies/MovieInterface";
import { useAuth } from "../../Contexts/Auth/UseAuth";
import { useMovies } from "../../Contexts/Movies/useMovies";
import { addOrRemoveToFavorites } from "../../Modules/Favorites/Favorites.service";
import Loading from "../Loading/Loading";
import Reactions from "../Reactions/Reactions";
import "./CardMovieStyle.css";

interface CardMovieProps {
  movie: Movie;
}

const CardMovie: React.FC<CardMovieProps> = ({ movie }) => {
  const { getUserID } = useAuth();
  const { fetchFavorites, getFavoritesOfSomeMovie } = useMovies();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addFavorites = async (id_movie: number) => {
    setIsLoading(true);
    const data = {
      id_movie,
    };
    await addOrRemoveToFavorites(data);
    await fetchFavorites();
    setIsLoading(false);
  };

  const favorites = getFavoritesOfSomeMovie(movie.id);
  const isFavorited = favorites?.some(
    (favorite) => favorite.id_user === getUserID()
  );
  return (
    <>
      <div key={movie.id} className="card-movie">
        <div className="div-favoritos">
          <p className="views-count">
            <Eye size={25} strokeWidth={1.1} color={"aliceblue"} />
            {movie.views.length}{" "}
            {`${movie.views.length === 1 ? "Visualização" : "Visualizações"} `}
          </p>
          {isLoading ? (
            <Loading color={"red"} size={20} padding={5} />
          ) : isFavorited ? (
            <img
              title="Remover da lista de favoritos"
              onClick={() => addFavorites(movie.id)}
              className="icon-favoritos-img"
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
        <div className="div-icon-and-link-img">
          <Link
            to={`/watch/${movie.id}/${movie.category_id}`}
            className="image-container"
          >
            <img src={movie.cover} alt="Capa" className="img-movie" />
            <CirclePlay className="icon-play-movie" />
          </Link>
        </div>
        <div className="info-movie">
          <p>{movie.title}</p>
        </div>
        <Reactions movie={movie} />
      </div>
    </>
  );
};

export default CardMovie;
