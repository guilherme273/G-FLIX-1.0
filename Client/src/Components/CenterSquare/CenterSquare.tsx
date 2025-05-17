import React from "react";
import "./CenterSquareStyle.css";

interface CenterSquareProps {
  children: React.ReactNode;
}

const CenterSquare: React.FC<CenterSquareProps> = ({ children }) => {
  return (
    <>
      <div className="center-square">{children}</div>
    </>
  );
};

export default CenterSquare;
