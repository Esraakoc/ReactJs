import React from "react";
import "../style/navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../UserContext";
import {CiLogin} from "react-icons/ci";
import {CiLogout} from "react-icons/ci";
function Navbar() {
  const navigate = useNavigate();
  const {user, logout} = useUser();

  const handleLogout = () => {
    logout();
    console.log("user logged out");
    navigate("/");
  };
  return (
    <div className="navbarDiv">
      <button onClick={() => navigate("/")}>
        <h2 className="title"> 📅Day Planner</h2>
      </button>

      {user ? (
        <>
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
          </nav>
          <button
            className="createBtn"
            onClick={handleLogout}
          >
            <CiLogout />
            Lagout
          </button>
        </>
      ) : (
        <nav>
          <Link
            className="navbarLink"
            to="/login"
          >
            <span>
              <CiLogin />
            </span>
            Login
          </Link>
          <Link
            className="navbarLink"
            to="/register"
          >
            Register
          </Link>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
