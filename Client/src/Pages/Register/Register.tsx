import React from "react";
import "./RegisterStyle.css";
import GeneralSectionAuth from "../../Components/GeneralSectionAuth/GeneralSectionAuth";
import CenterSquare from "../../Components/CenterSquare/CenterSquare";
import DivNavigateAuth from "../../Components/Forms/DivNavigateAuth/DivNavigateAuth";
import FormRegister from "../../Components/Forms/FormRegister/FormRegister";

const Register: React.FC = () => {
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
              <FormRegister />
              <DivNavigateAuth
                sentence={"Já possui uma conta?"}
                word={"Entrar"}
                link={"/login"}
              />
            </div>
          </div>
        </CenterSquare>
      </GeneralSectionAuth>
    </>
  );
};

export default Register;
