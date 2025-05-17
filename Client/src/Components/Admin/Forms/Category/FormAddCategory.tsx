import { useForm } from "react-hook-form";
import { FolderPen } from "lucide-react";
import { addCategoryDto } from "../../../../Modules/Categories/CategoriesInterface";
import { postCategory } from "../../../../Modules/Categories/Categories.service";
import Loading from "../../../Loading/Loading";

interface FormAddCategoryProps {
  fetch: () => Promise<void>;
}
const FormAddCategory: React.FC<FormAddCategoryProps> = ({ fetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<addCategoryDto>();

  const addMovie = async (data: addCategoryDto) => {
    await postCategory(data);
    await fetch();
  };
  return (
    <>
      <form onSubmit={handleSubmit(addMovie)} className="w-full space-y-4">
        <div className="flex flex-col gap-6">
          {/* Input com ícone e erro */}
          <div className="flex flex-col w-full gap-1">
            <div className="flex items-center w-full">
              <FolderPen className="w-5 h-5 mr-2 text-gray-400" />
              <input
                type="text"
                placeholder="Nome da Categoria"
                className="bg-transparent outline-none w-full h-[40px] px-[5px] rounded-[10px] text-[aliceblue] border border-red-500 text-sm placeholder-gray-400"
                {...register("name", {
                  required: "Nome da categoria obrigatório!",
                })}
              />
            </div>
            {errors.name && (
              <span className="text-xs text-red-500 ml-7">
                {errors.name.message}
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

export default FormAddCategory;
