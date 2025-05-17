import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest } from "./AuthService";
import { LoginDTO } from "../../Modules/User/Login.dto";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./Jwt";
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setisLogged] = useState<boolean>(false);

  const login = async (data: LoginDTO) => {
    const response = await loginRequest(data);
    const { access_token } = response;
    localStorage.setItem("token", access_token);

    if (access_token) {
      setisLogged(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setisLogged(false);
  };

  const getUserID = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.sub;
    }
  };

  useEffect(() => {
    const loggedin = localStorage.getItem("token");
    if (loggedin) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
    console.log(isLogged);
  }, [isLogged]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLogged,
        setisLogged,
        getUserID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
