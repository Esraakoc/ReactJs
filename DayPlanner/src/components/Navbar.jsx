import React from "react";
import "../style/navbar.css";
import {Link, useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbarDiv">
      <button onClick={() => navigate("/")}>
        <h2 className="title">Day Planner</h2>
      </button>
      <nav>
        <Link
          className="navbarLink"
          to="/create"
        >
          Create a Plan
        </Link>
        <Link
          className="navbarLink"
          to="/show_plans"
        >
          Show Plans
        </Link>
        <Link
          className="navbarLink"
          to="/login"
        >
          Login
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
