import React from "react";
import "../styles/login.css";
import {Link} from "react-router-dom";

function LogIn() {
  return (
    <div className="loginDiv">
      <div>
        <h1 className="login">LOGIN</h1>
        <div className="loginLine"></div>
      </div>
      <div className="input">
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
      <button className="loginBtn">Login</button>
    </div>
  );
}

export default LogIn;
