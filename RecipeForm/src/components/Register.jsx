import React from "react";
import "../styleScss/register.css";
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
          className="inputEmail"
          placeholder="EMAIL"
        />
        <input
          className="inputPassword"
          placeholder="PASSWORD"
        />
        <input
          className="inputPassword"
          placeholder="Confirm Password"
        />
      </div>
      <div className="alreadyReg">
        <div className="regAlready">Not yet registered? </div>
        <Link
          to="/login"
          className="regLink"
        >
          Login
        </Link>
      </div>
      <button className="regBtn">Register</button>
    </div>
  );
}

export default Register;
