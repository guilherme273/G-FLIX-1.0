import { useForm } from "react-hook-form";

import { Shield } from "lucide-react";
import "./FormChangePermissionStyle.css";
import "../../../../tailwindStyle.css";
import { useEffect } from "react";
import { UserChange } from "../../Table/UsersTable";
import { ChangePermissionDTO } from "../../../../Modules/User/ChangePermission.dto";
import { changePermissionUser } from "../../../../Modules/User/User.Service";
import Loading from "../../../Loading/Loading";
interface FormChangePermission {
  user: UserChange | null;
  fetchUsers: () => Promise<void>;
}
export interface dataChangePermission {
  type: number;
}

const FormChangePermission: React.FC<FormChangePermission> = ({
  user,
  fetchUsers,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ChangePermissionDTO>();

  const submit = async (data: ChangePermissionDTO) => {
    await changePermissionUser(data);
    await fetchUsers();
  };

  // Em useEffect ou dentro de um evento:
  useEffect(() => {
    if (user?.id) {
      setValue("id_user", user.id);
    }
  }, [user, setValue]);
  return (
    <>
      <>
        {user ? (
          <form
            onSubmit={handleSubmit(submit)}
            action="
        "
            className="form-change-permission"
          >
            <p className="name-user-form-change-perm">Usuário: {user.name}</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center w-full">
                <Shield className="w-5 h-5 mr-2 text-gray-400" />
                <select
                  {...register("type", {})}
                  className="w-full px-3 py-2 text-sm text-gray-100 placeholder-gray-400 bg-gray-900 border border-red-500 rounded focus:outline-none"
                >
                  <option value="0" selected={user.type === 0}>
                    Usuário Comum
                  </option>
                  <option value="1" selected={user.type === 1}>
                    Administrador
                  </option>
                </select>
              </div>
            </div>
            <input type="hidden" {...register("id_user")} />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-1 text-sm font-medium text-gray-100 ${
                isSubmitting
                  ? "submit-button-change-permission"
                  : "submit-button-change-permission"
              }`}
            >
              {isSubmitting ? (
                <Loading color="red" size={10} padding={0} />
              ) : (
                "Salvar"
              )}
            </button>
          </form>
        ) : (
          <Loading size={30} padding={10} color={"red"} />
        )}
      </>
    </>
  );
};

export default FormChangePermission;
