import api from "../../Api/Axios";
import { ViewsDTO } from "./Views.dto";

export const addToViews = async (data: ViewsDTO) => {
  const response = await api.post("/view", data);
  return response.data;
};
export const getViews = async () => {
  const response = await api.get("/admin/views");
  return response.data;
};
