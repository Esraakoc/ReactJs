import React from "react";
import "../styleScss/login.css";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function LogIn() {
  const {t} = useTranslation();
  return (
    <div className="loginDiv">
      <div>
        <h1 className="login">LOGIN</h1>
        <div className="loginLine"></div>
      </div>
      <div>
        <input
          className="inputEmail"
          placeholder="EMAIL"
        />
        <input
          className="inputPassword"
          placeholder="PASSWORD"
        />
      </div>
      <div className="notYetRegisterDiv">
        <div className="loginNotLogin">Not yet registered? </div>
        <Link
          to="/register"
          className="loginLink"
        >
          Register
        </Link>
      </div>
      <button className="loginBtn">{t("BUTTON_LOGIN")}</button>
    </div>
  );
}

export default LogIn;
