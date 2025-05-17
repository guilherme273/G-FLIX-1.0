import React from "react";
import "./GeneralSectionAuthStyle.css";

interface GeneralSectionAuthProps {
  children: React.ReactNode;
}

const GeneralSectionAuth: React.FC<GeneralSectionAuthProps> = ({
  children,
}) => {
  const img = {
    backgroundImage: "url('assets/login.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <section className="general-section-login" style={img}>
        {children}
      </section>
    </>
  );
};

export default GeneralSectionAuth;
