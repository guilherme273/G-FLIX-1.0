import React from "react";
import { LucideIcon } from "lucide-react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import "./InputAuthStyle.css";

interface InputAuthProps {
  icon: LucideIcon;
  type: string;
  placeholder: string;
  inputName: "name" | "email" | "password" | "confirmPassword" | "url";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: {
    type: string;
    message?: string;
  };
}

const InputAuth: React.FC<InputAuthProps> = ({
  icon: Icon,
  type,
  placeholder,
  inputName,
  register,
  registerOptions,
  error,
}) => {
  return (
    <div className="w-100">
      <div className="div-input-auth">
        <Icon strokeWidth={0.5} className="icon-form-auth" />
        <input
          type={type}
          placeholder={placeholder}
          {...register(inputName, registerOptions)}
          className="input-auth"
        />
      </div>
      {error && <p className="p-alert">{error.message}</p>}
    </div>
  );
};

export default InputAuth;
