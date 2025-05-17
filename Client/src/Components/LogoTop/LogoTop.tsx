import "./LogoTopStyle.css";

const LogoTop: React.FC = () => {
  return (
    <>
      <section className="logo-top">
        <div className="div-image-logo-top">
          <img
            src="/public/assets/logo-g.png"
            className="logo-top-image"
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default LogoTop;
