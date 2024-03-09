import React from "react";
import homePhoto from "../image/2024.jpg";
import "../style/home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <img src={homePhoto} />
      <button onClick={() => navigate("/login")}>Try it free</button>
    </div>
  );
}

export default Home;
