import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminGuard } from "../Modules/Admin/Admin.service";
import GeneralLoading from "../Components/Loading/GeneralLoading";

const IsAdmin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const result = await adminGuard();
      setIsAdmin(result);
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return <GeneralLoading />;
  }

  return isAdmin ? <Outlet /> : <GeneralLoading />;
};

export default IsAdmin;
