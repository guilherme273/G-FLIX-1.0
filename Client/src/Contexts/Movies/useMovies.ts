import { useContext } from "react";
import { MoviesContext } from "./MoviesContext";

export const useMovies = () => {
  return useContext(MoviesContext);
};
