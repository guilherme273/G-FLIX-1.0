import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Contexts/Auth/UseAuth";
import {
  AlignJustify,
  Home,
  LayoutDashboard,
  LogOut,
  Search,
  Star,
  User as UserIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderStyle.css";
import { User } from "../../Modules/User/UserInterface";
import { getUser } from "../../Modules/User/User.Service";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const [showMObileHeader, setShowMObileHeader] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(null);

  const leave = async () => {
    logout();
    navigate("/login");
  };

  const fethGetUser = async () => {
    const data = await getUser();
    setUser(data.user);
  };
  useEffect(() => {
    fethGetUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setShowMObileHeader(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setShowMObileHeader(!showMObileHeader)}
        className={!showMObileHeader ? "button-mobile-header" : "none"}
      >
        <AlignJustify className="icon-mobile-button" color="red" size={30} />
      </button>
      <header
        ref={menuRef}
        className={showMObileHeader ? "header-mobile" : "header"}
      >
        <div className="div-header-logo">
          <Link to="/" className="link-logo">
            <img
              src="/assets/logo-g.png"
              className="logo-g-flix-header"
              alt=""
            />
          </Link>
        </div>
        <div className="div-header-nav">
          <Link className="link-header" to="/">
            <Home className="icon-link-header" />
            Home
          </Link>

          <Link className="link-header" to="/search">
            <Search className="icon-link-header" />
            Pesquisar
          </Link>
          <Link className="link-header" to="/favorites">
            <Star className="icon-link-header" />
            Favoritos
          </Link>
          {user?.type === 1 ? (
            <Link className="link-header" to="/dashboard">
              <LayoutDashboard className="icon-link-header" />
              Dashboard
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="div-header">
          <div
            className="div-user-header-content"
            onClick={() => setOpen(!open)}
            role="button"
            aria-expanded={open}
            aria-controls="dropdown-menu"
          >
            <UserIcon className="icon-user-header" />
          </div>

          {open && (
            <div
              className={`${
                showMObileHeader ? "dropdown-menu-mobile" : "dropdown-menu"
              }`}
            >
              {showMObileHeader ? (
                ""
              ) : (
                <div className="div-email-user-header">
                  <p className="email-user-header">{user?.email}</p>
                </div>
              )}

              <div>
                <button
                  className="button-menu-user-header"
                  onClick={() => leave()}
                >
                  <LogOut className="icon-link-header" />
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
