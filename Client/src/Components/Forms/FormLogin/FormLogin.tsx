import { AtSign, LockKeyhole } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginDTO } from "../../../Modules/User/Login.dto";
import InputAuth from "../InputAuth/InputAuth";
import "./FormLoginStyle.css";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useAuth } from "../../../Contexts/Auth/UseAuth";

const FormLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDTO>();

  const { login } = useAuth();
  const makeRequest: SubmitHandler<LoginDTO> = async (data: LoginDTO) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(makeRequest)} className="formulario-login">
      <InputAuth
        icon={AtSign}
        type="text"
        placeholder="Email"
        inputName="email"
        register={register}
        registerOptions={{
          required: "Email obrigatório",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de email inválido",
          },
        }}
        error={
          errors.email
            ? { type: errors.email.type, message: errors.email.message }
            : undefined
        }
      />

      <InputAuth
        icon={LockKeyhole}
        type="password"
        placeholder="Senha"
        inputName="password"
        register={register}
        registerOptions={{
          required: "Senha obrigatória",
        }}
        error={
          errors.password
            ? { type: errors.password.type, message: errors.password.message }
            : undefined
        }
      />

      <SubmitButton disableButton={isSubmitting} text="Entrar" />
    </form>
  );
};

export default FormLogin;
