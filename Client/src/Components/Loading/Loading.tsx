import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingProps {
  color: string;
  size: number;
  padding: number;
}

const Loading: React.FC<LoadingProps> = ({ padding, color, size }) => {
  return (
    <>
      <div style={{ padding: `${padding}px` }}>
        <ClipLoader color={color} size={size} />
      </div>
    </>
  );
};

export default Loading;
