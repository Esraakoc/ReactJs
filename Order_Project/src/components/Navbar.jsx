import React from "react";
import {Link, useLocation} from "react-router-dom";
import "../styles/navbar.css";
import {useNavigate} from "react-router-dom";
import logo from "../images/Logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Bu işlev, bir yolun geçerli sayfa ile uyuşup uyuşmadığını kontrol eder
  const isActive = (pathname) => {
    return location.pathname === pathname ? "active" : "";
  };

  return (
    <div className="navbar">
      <div className="navbarIcon">
        <button
          className="navbarBtn"
          onClick={() => navigate("/")}
        >
          <img
            className="navbarLogo"
            src={logo}
          />
          <h2 className="pizzah2">Pizza W</h2>
        </button>

        <div className="navbarMain">
          <nav className="navbarLinks">
            <Link
              to="/"
              className={isActive("/")}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={isActive("/menu")}
            >
              Menu
            </Link>
            <Link
              to="/login"
              className={isActive("/login")}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className={isActive("/register")}
            >
              Register
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
