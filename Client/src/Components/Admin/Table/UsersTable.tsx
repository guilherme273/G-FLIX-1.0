import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { User } from "../../../Modules/User/UserInterface";
import { delUser } from "../../../Modules/User/User.Service";
import Loading from "../../Loading/Loading";
import Confirm from "../../Confirm/Confirm";
import Modal from "../../Modal/Modal";
import FormChangePermission from "../Forms/FormChangePermission/FormChangePermission";
import FormRegister from "../../Forms/FormRegister/FormRegister";

interface TableProps {
  users: User[] | undefined;
  fetchUsers: () => Promise<void>;
}
export interface UserChange {
  id: number;
  name: string;
  type: number;
}

const UsersTable: React.FC<TableProps> = ({ users, fetchUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users || []);
  const [openConfirmDel, setOpenConfirmDel] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [userToChangePermission, setUserToChangePermission] =
    useState<UserChange | null>(null);
  const [isOpenModalRegister, setIsOpenModalRegister] =
    useState<boolean>(false);
  const [isOpenModalChangePermission, setIsOpenModalChangePermission] =
    useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (users) setFilteredUsers(users);
  }, [users]);

  const paginateUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers?.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users?.filter(
      (user: User) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered || []);
    setCurrentPage(1);
  };

  const deleteUser = (user_id: number) => {
    setUserToDelete(user_id);
    setOpenConfirmDel(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete !== null) {
      await delUser(userToDelete);
      setUserToDelete(null);
      await fetchUsers();
    }
  };
  const changePermission = (
    user_id: number,
    user_name: string,
    type: number
  ) => {
    const newUser: UserChange = { id: user_id, name: user_name, type: type };
    setUserToChangePermission(newUser);
    setIsOpenModalChangePermission(true);
  };

  return (
    <>
      <motion.div
        className="p-6 border shadow-lg section-start-card backdrop-blur-md rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {users ? (
          <>
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Buscar usuário..."
                  className="w-full py-2 pl-10 pr-4 text-white placeholder-gray-200 bg-gray-800 rounded-lg sm:w-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <div className="flex flex-row items-center justify-center gap-1">
                <button onClick={() => setIsOpenModalRegister(true)}>
                  <Plus className="w-[35px] h-[35px] text-lime-500 hover:text-lime-600" />
                </button>
                <strong className="text-gray-200">
                  Adicionar Novo Usuário
                </strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      tipo
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {paginateUsers()?.map((user: User) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full bg-gradient-to-r from-purple-400 to-blue-500">
                              {user.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {user.email}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.type === 1
                              ? "bg-green-800 text-green-100"
                              : "bg-blue-800 text-red-100"
                          }`}
                        >
                          {user.type === 1 ? "Administrador" : "Usuário Comun"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <button
                          onClick={() =>
                            changePermission(user.id, user.name, user.type)
                          }
                          title="Editar"
                          className="mr-2 text-yellow-400 hover:text-yellow-200"
                        >
                          <Pencil />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          title="Deletar"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="px-3 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ArrowLeft />
              </button>
              <span className="px-2 text-sm text-gray-300">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="px-3 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ArrowRight />
              </button>
            </div>
          </>
        ) : (
          <Loading color="red" size={50} padding={10} />
        )}
      </motion.div>

      {openConfirmDel && (
        <Confirm
          setOpenConfirm={setOpenConfirmDel}
          onConfirm={handleDeleteConfirm}
          mensagem="Tem certeza que deseja excluir este usuário?"
        />
      )}
      {isOpenModalRegister && (
        <Modal
          title={"Adicionar Usuário!"}
          children={<FormRegister fetch={fetchUsers} />}
          setIsOpenModal={setIsOpenModalRegister}
        />
      )}
      {isOpenModalChangePermission && (
        <Modal
          title={"Trocar Permissão do Usuário!"}
          children={
            <FormChangePermission
              fetchUsers={fetchUsers}
              user={userToChangePermission}
            />
          }
          setIsOpenModal={setIsOpenModalChangePermission}
        />
      )}
    </>
  );
};
export default UsersTable;
