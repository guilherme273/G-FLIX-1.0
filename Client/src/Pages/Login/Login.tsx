import React from "react";
import CenterSquare from "../../Components/CenterSquare/CenterSquare";
import GeneralSectionAuth from "../../Components/GeneralSectionAuth/GeneralSectionAuth";
import FormLogin from "../../Components/Forms/FormLogin/FormLogin";

import "./Login.Style.css";

import DivNavigateAuth from "../../Components/Forms/DivNavigateAuth/DivNavigateAuth";
import { useAuth } from "../../Contexts/Auth/UseAuth";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const { isLogged } = useAuth();
  if (isLogged) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <>
        <GeneralSectionAuth>
          <CenterSquare>
            <div className="content-center-square-login">
              <img
                src="/assets/logo-g.png"
                className="logo-g-flix-login"
                alt=""
              />
              <div className="form-login-div-navigate">
                <FormLogin />
                <DivNavigateAuth
                  sentence={"Ainda não possui conta?"}
                  word={"Cadastre-se"}
                  link={"/register"}
                />
              </div>
            </div>
          </CenterSquare>
        </GeneralSectionAuth>
      </>
    );
  }
};

export default Login;
