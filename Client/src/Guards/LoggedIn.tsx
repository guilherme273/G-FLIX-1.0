import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { authGuard } from "../Contexts/Auth/AuthService";
import GeneralLoading from "../Components/Loading/GeneralLoading";

const LoggedIn: React.FC = () => {
  const [isLogged, setisLogged] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsLogged = async () => {
      const result = await authGuard();
      setisLogged(result);
    };

    checkIsLogged();
  }, []);

  if (isLogged === null) {
    return <GeneralLoading />;
  }

  return isLogged ? <Outlet /> : <GeneralLoading />;
};

export default LoggedIn;
