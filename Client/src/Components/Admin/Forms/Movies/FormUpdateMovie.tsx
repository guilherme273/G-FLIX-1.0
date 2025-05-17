import { useForm } from "react-hook-form";

import { Heading, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import "./FormAddMovieStyle.css";
import {
  MovieTable,
  updateMovieDTO,
} from "../../../../Contexts/Movies/MovieInterface";
import { Category } from "../../../../Modules/Categories/CategoriesInterface";
import { getCategories } from "../../../../Modules/Categories/Categories.service";
import { updateMovie } from "../../../../Contexts/Movies/Movie.service";
import Loading from "../../../Loading/Loading";

interface FormUpdateMovieProps {
  fetch: () => Promise<void>;
  movie: MovieTable | null;
}
const FormUpdateMovie: React.FC<FormUpdateMovieProps> = ({ fetch, movie }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<updateMovieDTO>({
    defaultValues: {
      category_id: movie?.category_id.toString(),
      title: movie?.title,
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const categoryData = await getCategories();
    setCategories(categoryData.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (movie?.id) {
      setValue("id_movie", movie.id);
    }
  }, [movie, setValue]);

  const update = async (data: updateMovieDTO) => {
    await updateMovie(data);
    await fetch();
    console.log(data);
  };
  return (
    <>
      {movie ? (
        <form onSubmit={handleSubmit(update)} className="w-full space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center w-full">
              <Layers className="w-5 h-5 mr-2 text-gray-400" />
              <select
                {...register("category_id", {
                  required: "Selecione uma categoria",
                  validate: (value) =>
                    value !== "0" || "Selecione uma categoria válida",
                })}
                className="bg-gray-800 outline-none w-full h-[40px] px-[5px] rounded-[10px] text-white border border-red-500 text-sm placeholder-gray-400"
              >
                <option value={movie.category.id}>{movie.category.name}</option>
                {categories?.map((cat) =>
                  cat.id !== movie.category.id ? (
                    <option key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </option>
                  ) : null
                )}
              </select>
            </div>
            {errors.category_id && (
              <span className="text-xs text-red-500 ml-7">
                {errors.category_id.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {/* Input com ícone e erro */}
            <div className="flex flex-col w-full gap-1">
              <div className="flex items-center w-full">
                <Heading className="w-5 h-5 mr-2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Título"
                  className="bg-transparent outline-none w-full h-[40px] px-[5px] rounded-[10px] text-[aliceblue] border border-red-500 text-sm placeholder-gray-400"
                  {...register("title", {
                    required: "Titulo Obrigatório",
                  })}
                />
              </div>
              {errors.title && (
                <span className="text-xs text-red-500 ml-7">
                  {errors.title.message}
                </span>
              )}
            </div>
            <input type="hidden" {...register("id_movie")} />
            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-1 text-sm font-medium text-gray-100 ${
                isSubmitting
                  ? "submit-button-add-movie-disable"
                  : "submit-button-add-movie"
              }`}
            >
              {isSubmitting ? (
                <Loading color="red" size={10} padding={0} />
              ) : (
                "Salvar"
              )}
            </button>
          </div>
        </form>
      ) : (
        <Loading color="red" size={50} padding={0} />
      )}
    </>
  );
};

export default FormUpdateMovie;
