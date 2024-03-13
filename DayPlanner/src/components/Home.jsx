import React from "react";
import homePhoto from "../image/2024.jpg";
import "../style/home.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="home">
      <img src={homePhoto} />
      <div class="button-container">
        <button onClick={() => navigate(user ? "/create" : "/login")}>
          <span>Try it free </span>
        </button>
      </div>
    </div>
  );
}

export default Home;
