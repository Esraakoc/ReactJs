import React, {useState} from "react";
import "../styleScss/navbar.css";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../images/Logo.png";
import {BsPersonCircle} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const navigate = useNavigate();

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
            marginTop: "6px",
            marginRight: "40px",
            color: "#005D8E",
            textDecoration: "none",
          }}
          to="/add_recipe"
        >
          {t("Add_Recipe_Navbar")}
        </Link>
        <Dropdown className="dropdownDiv">
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
          >
            Meals
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/dessert">Dessert</Dropdown.Item>
            <Dropdown.Item href="/soup">Soup</Dropdown.Item>
            <Dropdown.Item href="/bread">Bread</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link
          style={{
            marginTop: "6px",
            marginLeft: "50px",
            color: "#005D8E",
            textDecoration: "none",
          }}
          to="/login"
        >
          <span style={{marginRight: "5px"}}>
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
