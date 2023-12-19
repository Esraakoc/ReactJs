import React from "react";
import "../style/navbar.css";
import photo from "../image/clock-icon.png";
import {Link, useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbarDiv">
      <div style={{display: "flex"}}>
        <button onClick={() => navigate("/")}>
          <img
            src={photo}
            className="navbarPhoto"
          />
        </button>
        <h2 className="title">Day Planner</h2>
      </div>
      <nav>
        <Link
          className="navbarLink"
          to="/show_plans"
        >
          Show Plans
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
