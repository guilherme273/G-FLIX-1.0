import GeneralSection from "../GeneralSection/GeneralSection";
import Loading from "./Loading";
import "./GeneralLoadingStyle.css";
const GeneralLoading: React.FC = () => {
  return (
    <>
      <GeneralSection>
        <div className="section-loading">
          <Loading color={"red"} size={50} padding={10} />
          <img
            src="/assets/logo-g.png"
            className="logo-g-general-loading"
            alt=""
          />
        </div>
      </GeneralSection>
    </>
  );
};

export default GeneralLoading;
