import api from "../../Api/Axios";
import { toast_fy } from "../../Utils/Toast/Toast";
import { addCategoryDto } from "./CategoriesInterface";

export const getCategories = async () => {
  const response = await api.get("/category");
  return response.data;
};
export const getCategoriesPage = async () => {
  const response = await api.get("/admin/categories");
  return response.data;
};
export const postCategory = async (data: addCategoryDto) => {
  const response = await api.post("/admin/category", data);
  toast_fy(response.data);
  return response.data;
};
export const delCategory = async (param: number) => {
  const response = await api.delete(`/admin/category/${param}`);
  toast_fy(response.data);
  return response.data;
};
