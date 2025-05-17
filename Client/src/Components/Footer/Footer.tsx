import { Link } from "react-router-dom";
import "./FooterStyle.css";
import { Github, Linkedin } from "lucide-react";
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <h3>
        <img src="/assets/logo-g.png" className="logo-g-flix-footer" alt="" /> ©
        Desenvolvido Por
        <Link
          title="Portifólio do Programador"
          className="link-portifolio"
          to="https://guilherme-feitosa-cunha.vercel.app/"
        >
          Guilherme Feitosa Cunha
        </Link>
      </h3>
      <div className="div-icons-footer">
        <a
          title="Github"
          className="link-icon-footer"
          href="https://github.com/guilherme273"
        >
          <Github size={23} className="icon-footer-git" />
        </a>
        <a
          title="Linkedin"
          className="link-icon-footer"
          href="https://www.linkedin.com/in/guilherme-cunha-249529262/"
        >
          <Linkedin size={23} className="icon-footer-linke" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
