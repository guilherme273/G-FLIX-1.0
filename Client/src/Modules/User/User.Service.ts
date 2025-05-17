import api from "../../Api/Axios";
import { toast_fy } from "../../Utils/Toast/Toast";
import { RegisterDTO } from "./Register.dto";
import { ChangePermissionDTO } from "./ChangePermission.dto";

export const registerUser = async (data: RegisterDTO) => {
  const response = await api.post("/user", data);
  toast_fy(response.data);
  return response.data;
};
export const getUser = async () => {
  const response = await api.get("/user");
  return response.data;
};
export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};
export const delUser = async (param: number) => {
  const response = await api.delete(`/admin/user/${param}`);
  toast_fy(response.data);
  return response.data;
};
export const changePermissionUser = async (data: ChangePermissionDTO) => {
  console.log("dd", data);
  const response = await api.patch("/admin/change-permission", data);

  toast_fy(response.data);
  return response.data;
};
