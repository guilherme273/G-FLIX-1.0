import Footer from "../../Components/Footer/Footer";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Header from "../../Components/Header/Header";
import "./NotFound404Style.css";

const NotFound404: React.FC = () => {
  return (
    <>
      <GeneralSection>
        <Header />
        <section className="section-not-found">
          <img className="img-not-found" src="/assets/404.png" alt="" />
        </section>
        <Footer />
      </GeneralSection>
    </>
  );
};

export default NotFound404;
