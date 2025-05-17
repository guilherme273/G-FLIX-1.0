import api from "../../Api/Axios";
import { toast_fy } from "../../Utils/Toast/Toast";
import { LoginDTO } from "../../Modules/User/Login.dto";
import { User } from "../../Modules/User/UserInterface";

interface AuthResponse {
  access_token: string;
  userId: number;
  user: User;
}

export const loginRequest = async (data: LoginDTO): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/signin", data);
  toast_fy(response.data);
  return response.data;
};

export const authGuard = async (): Promise<boolean> => {
  try {
    const response = await api.get<boolean>("/auth");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};
