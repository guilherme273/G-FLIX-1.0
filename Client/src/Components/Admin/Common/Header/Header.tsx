import "./HeaderStyle.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-[100%] mt-2 mb-8 flex flex-row items-center gap-5">
      <img src="/assets/logo-g.png" className="w-[150px]" alt="" />
      <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
    </header>
  );
};
export default Header;
