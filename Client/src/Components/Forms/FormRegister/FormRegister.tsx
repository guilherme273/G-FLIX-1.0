import React from "react";
import { useForm } from "react-hook-form";
import { AtSign, Lock, LockKeyhole, User } from "lucide-react";
import InputAuth from "../InputAuth/InputAuth";
import SubmitButton from "../SubmitButton/SubmitButton";
import { registerUser } from "../../../Modules/User/User.Service";
import { RegisterData } from "../../../Modules/User/Register.dto";

interface FormRegisterProps {
  fetch?: () => Promise<void>;
}

const FormRegister: React.FC<FormRegisterProps> = ({ fetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterData>();
  const matchPassword = watch("password");

  const makeRequest = async (data: RegisterData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...requestData } = data;
    await registerUser(requestData);
    if (fetch) {
      await fetch();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(makeRequest)} className="formulario-login">
        <InputAuth
          icon={User}
          type="text"
          placeholder="Nome"
          inputName="name"
          register={register}
          registerOptions={{
            required: "Nome obrigatório",
          }}
          error={errors.name}
        />

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
          error={errors.email}
        />

        <InputAuth
          icon={Lock}
          type="password"
          placeholder="Senha"
          inputName="password"
          register={register}
          registerOptions={{
            required: "Senha obrigatória",
            minLength: {
              value: 6,
              message: "Senha deve ter no mínimo 6 caracteres",
            },
            validate: (value) => {
              const hasUpperCase = /[A-Z]/.test(value);
              const hasNumber = /[0-9]/.test(value);
              const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

              if (!hasUpperCase)
                return "A senha deve conter ao menos uma letra maiúscula";
              if (!hasNumber) return "A senha deve conter ao menos um número";
              if (!hasSpecialChar)
                return "A senha deve conter ao menos um caractere especial";

              return true;
            },
          }}
          error={errors.password}
        />
        <InputAuth
          icon={LockKeyhole}
          type="password"
          placeholder="Confirme a senha"
          inputName="confirmPassword"
          register={register}
          registerOptions={{
            required: "Confirmação obrigatória",
            validate: (value) =>
              value === matchPassword || "As senhas não conferem",
          }}
          error={errors.confirmPassword}
        />

        <SubmitButton disableButton={isSubmitting} text="Registrar-se" />
      </form>
    </>
  );
};

export default FormRegister;
