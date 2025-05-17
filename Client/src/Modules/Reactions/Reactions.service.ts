import api from "../../Api/Axios";
import { toast_fy } from "../../Utils/Toast/Toast";
import { ReactionsDto } from "./Reactions.dto";

export const makeReaction = async (data: ReactionsDto) => {
  const response = await api.post("/reactions", data);
  toast_fy(response.data);
  return response.data;
};

export const getReactions = async () => {
  const response = await api.get("/reactions");
  return response.data;
};
