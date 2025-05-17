import api from "../../Api/Axios";
import { toast_fy } from "../../Utils/Toast/Toast";
import { addMovieDto, updateMovieDTO } from "./MovieInterface";

export const getMovies = async () => {
  const response = await api.get("/movie");
  return response.data;
};
export const postMovie = async (data: addMovieDto) => {
  const response = await api.post("/admin/movie", data);
  toast_fy(response.data);
  return response.data;
};

export const getMoviesAdmin = async () => {
  const response = await api.get("admin/movies");
  return response.data;
};
export const updateMovie = async (data: updateMovieDTO) => {
  const response = await api.patch("admin/movie/", data);
  toast_fy(response.data);
  return response.data;
};
export const delMovie = async (param: number) => {
  const response = await api.delete(`admin/movie/${param}`);
  toast_fy(response.data);
  return response.data;
};
