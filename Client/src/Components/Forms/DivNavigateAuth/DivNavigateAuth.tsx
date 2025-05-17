import React from "react";
import { Link } from "react-router-dom";
import "./DivNavigateAuthStyle.css";

interface DivNavigateAuthProps {
  sentence: string;
  word: string;
  link: string;
}

const DivNavigateAuth: React.FC<DivNavigateAuthProps> = ({
  sentence,
  word,
  link,
}) => {
  return (
    <>
      <div className="register-login">
        <p className="text-register-login">
          {sentence}
          <Link to={link} className="link-register-login">
            {word}
          </Link>
        </p>
      </div>
    </>
  );
};

export default DivNavigateAuth;
