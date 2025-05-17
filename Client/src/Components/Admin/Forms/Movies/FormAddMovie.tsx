import { useForm } from "react-hook-form";
import { Layers, Link } from "lucide-react";
import { useEffect, useState } from "react";
import "./FormAddMovieStyle.css";
import { addMovieDto } from "../../../../Contexts/Movies/MovieInterface";
import { Category } from "../../../../Modules/Categories/CategoriesInterface";
import { getCategories } from "../../../../Modules/Categories/Categories.service";
import { postMovie } from "../../../../Contexts/Movies/Movie.service";
import Loading from "../../../Loading/Loading";

interface FormAddMovieProps {
  fetch: () => Promise<void>;
}
const FormAddMovie: React.FC<FormAddMovieProps> = ({ fetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<addMovieDto>();

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const categoryData = await getCategories();
    setCategories(categoryData.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addMovie = async (data: addMovieDto) => {
    await postMovie(data);
    await fetch();
  };
  return (
    <>
      <form onSubmit={handleSubmit(addMovie)} className="w-full space-y-4">
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
              <option value="0">Escolha uma categoria</option>
              {categories?.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
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
              <Link className="w-5 h-5 mr-2 text-gray-400" />
              <input
                type="text"
                placeholder="URL do YouTube"
                className="bg-transparent outline-none w-full h-[40px] px-[5px] rounded-[10px] text-[aliceblue] border border-red-500 text-sm placeholder-gray-400"
                {...register("url", {
                  required: "Url obrigatória",
                })}
              />
            </div>
            {errors.url && (
              <span className="text-xs text-red-500 ml-7">
                {errors.url.message}
              </span>
            )}
          </div>

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
    </>
  );
};

export default FormAddMovie;
