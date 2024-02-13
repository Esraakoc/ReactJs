import React from "react";
import pizza from "../images/pizza.jpg";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import "../styles/home.css";
import logo from "../images/Logo.png";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="image-container">
      <img
        className="darkened-image"
        src={pizza}
      />
      <div className="image-overlay">
        <div> 
          <div className="home-logo-pizza">
            <img
              className="homeLogo"
              src={logo}
            /> 
            <h1 className="homePizzaW">Pizza W</h1>
          </div>
          <div>
            <h1 className="overlay-text">Pizza W Online Ordering</h1>
            <h1 className="overlay-text">
              Your Yummy Pizza Delivered Fast & Fresh
            </h1>
          </div>
        </div>
        <Button
          color="success"
          variant="contained"
          onClick={() => navigate("/menu")}
        >
          Order Now
        </Button>
      </div>
    </div>
  );
}

export default Home;
