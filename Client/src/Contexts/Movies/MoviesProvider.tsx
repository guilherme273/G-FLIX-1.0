import { useState } from "react";
import { MoviesContext } from "./MoviesContext";
import { Movie, Movies } from "./MovieInterface";
import { getMovies } from "./Movie.service";
import { Reaction } from "../../Modules/Reactions/ReactionsInterface";
import { getReactions } from "../../Modules/Reactions/Reactions.service";
import { Favorites } from "../../Modules/Favorites/FavoritesInterface";
import { getFavorites } from "../../Modules/Favorites/Favorites.service";
import { useAuth } from "../Auth/UseAuth";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const { getUserID } = useAuth();
  const [movies, setMovies] = useState<Movies[]>([]);
  const [moviesNoCategory, setMoviesNoCategory] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Favorites[]>([]);
  const [favoritesUser, setFavoritesUser] = useState<Favorites[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();

      const noCategory = response.movies.flatMap(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (category: any) => category.movies
      );

      setMoviesNoCategory(noCategory);

      setMovies(response.movies);
      return true;
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return false;
    }
  };

  const fetchReactions = async () => {
    try {
      const response = await getReactions();
      setReactions(response.reactions);
      return true;
    } catch (error) {
      console.error("Erro ao buscar reações:", error);
      return false;
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await getFavorites();
      const newfavoriteMovies = response.favorites.filter(
        (favorite: Favorites) => {
          return favorite.id_user === getUserID();
        }
      );
      setFavorites(response.favorites);
      setFavoritesUser(newfavoriteMovies);
      return true;
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      return false;
    }
  };

  const getMovie = (id_movie: number) => {
    const movie = moviesNoCategory.find((movie) => movie.id === id_movie);
    return movie;
  };

  const getMoviesForCategory = (id_category: number | undefined) => {
    const movies = moviesNoCategory.filter(
      (movie) => movie.category_id === id_category
    );
    if (!movies) return moviesNoCategory;
    return movies;
  };

  const getReactionsOfSomeMovie = (id_movie: number) => {
    const reactionsThisMovie = reactions.filter((reaction) => {
      return reaction.id_movie === id_movie;
    });
    return reactionsThisMovie;
  };

  const getFavoritesOfSomeMovie = (id_movie: number) => {
    const favoritesThisMovie = favorites.filter((favorite) => {
      return favorite.id_movie === id_movie;
    });
    return favoritesThisMovie;
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        reactions,
        favorites,
        favoritesUser,
        moviesNoCategory,
        getMovie,
        getMoviesForCategory,
        getReactionsOfSomeMovie,
        getFavoritesOfSomeMovie,
        fetchReactions,
        fetchFavorites,
        fetchMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
