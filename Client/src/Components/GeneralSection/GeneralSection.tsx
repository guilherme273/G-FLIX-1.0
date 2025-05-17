interface GeneralSectionProps {
  children: React.ReactNode;
}

const GeneralSection: React.FC<GeneralSectionProps> = ({ children }) => {
  return (
    <>
      <section className="general-section">{children}</section>
    </>
  );
};

export default GeneralSection;
