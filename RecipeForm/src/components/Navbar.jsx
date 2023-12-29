import React, {useState} from "react";
import "../styleScss/navbar.css";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../images/Logo.png";
import {BsPersonCircle} from "react-icons/bs";
import MenuIcon from "@mui/icons-material/Menu";
import {useTranslation} from "react-i18next";

function SubMenu() {
  return (
    <div className="sub-menu">
      <Link to="/dessert">Dessert</Link>
      <Link to="/soup">Soup</Link>
      <Link to="/bread">Bread</Link>
    </div>
  );
}
function Navbar() {
  const navigate = useNavigate();

  const [showCategories, setShowCategories] = useState(false);
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };
  const handleChangeLanguage = (newLanguage) => {
    localStorage.setItem("language", newLanguage);
    window.location.reload();
  };
  const {t} = useTranslation();
  return (
    <div className="navbarDiv">
      <button
        className="navbarLogoBtn"
        onClick={() => navigate("/")}
      >
        <img
          className="navbarLogo"
          src={Logo}
        />
      </button>
      <nav className="navbarNav">
        <Link
          style={{
            marginRight: "40px",
            color: "#005D8E",
            textDecoration: "none",
          }}
          to="/add_recipe"
        >
          {t("Add_Recipe_Navbar")}
        </Link>
        <Link
          onMouseEnter={toggleCategories}
          onMouseLeave={toggleCategories}
          style={{color: "#005D8E", textDecoration: "none", display: "flex"}}
        >
          <span>{t("Meals_Navbar")}</span>
          <span style={{paddingLeft: "2px"}}>
            <MenuIcon />
          </span>
          {showCategories && <SubMenu />}
        </Link>
        <Link
          style={{
            marginLeft: "50px",
            color: "#005D8E",
            textDecoration: "none",
          }}
          to="/login"
        >
          <span
            style={{
              marginRight: "5px",
            }}
          >
            <BsPersonCircle />
          </span>
          {t("Log_In")}
        </Link>
      </nav>
      <button
        className="enBtn"
        onClick={() => handleChangeLanguage("en")}
      >
        English
      </button>
      <button
        className="trBtn"
        onClick={() => handleChangeLanguage("tr")}
      >
        Turkish
      </button>
    </div>
  );
}

export default Navbar;
