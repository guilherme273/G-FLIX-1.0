import React from "react";
import "./SubmitButtonStyle.css";
import Loading from "../../Loading/Loading";

interface SubmitButtonProps {
  text: string;
  disableButton: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disableButton }) => {
  return (
    <>
      <button
        className={
          disableButton ? "submit-button-auth-disable" : "submit-buttom-auth"
        }
        type="submit"
        disabled={disableButton}
      >
        {disableButton ? <Loading color={"red"} size={10} padding={0} /> : text}
      </button>
    </>
  );
};

export default SubmitButton;
