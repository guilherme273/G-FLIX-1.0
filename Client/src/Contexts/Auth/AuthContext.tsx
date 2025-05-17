import { createContext } from "react";

import { LoginDTO } from "../../Modules/User/Login.dto";

interface AuthContextType {
  login: (data: LoginDTO) => Promise<void>;
  logout: () => void;
  getUserID: () => number | undefined;
  setisLogged: (isLogged: boolean) => void;
  isLogged: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
