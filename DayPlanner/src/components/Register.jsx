import React from "react";
import "../style/register.css";
import {Link} from "react-router-dom";

function Register() {
  return (
    <div className="regDiv">
      <div>
        <h1 className="reg">REGISTER</h1>
        <div className="regLine"></div>
      </div>
      <div>
        <input
          className="inputName"
          placeholder="NAME and SURNAME"
        />
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
        <div className="loginNotLogin">Are you already a member?</div>
        <Link
          to="/login"
          className="loginLink"
        >
          Login
        </Link>
      </div>
      <button className="loginBtn">Sign up</button>
    </div>
  );
}

export default Register;
