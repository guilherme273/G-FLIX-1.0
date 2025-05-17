import { createContext } from "react";
import { Movie, Movies } from "./MovieInterface";
import { Reaction } from "../../Modules/Reactions/ReactionsInterface";
import { Favorites } from "../../Modules/Favorites/FavoritesInterface";

interface MoviesContextType {
  movies: Movies[];
  moviesNoCategory: Movie[];
  favorites: Favorites[];
  reactions: Reaction[];
  favoritesUser: Favorites[];
  fetchMovies: () => Promise<boolean>;
  fetchReactions: () => Promise<boolean>;
  fetchFavorites: () => Promise<boolean>;
  getMovie: (id_movie: number) => Movie | undefined;
  getMoviesForCategory: (id_category: number) => Movie[];
  getReactionsOfSomeMovie: (id_movie: number) => Reaction[] | undefined;
  getFavoritesOfSomeMovie: (id_movie: number) => Favorites[] | undefined;
}

export const MoviesContext = createContext<MoviesContextType>(
  {} as MoviesContextType
);
