import React from "react";
import "../style/footer.css";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import AddDropdown from "./AddDropdown";

function Footer() {
  const languages = ["English", "Turkish", "Italiano", "Français"];
  const navigate = useNavigate();
  return (
    <div className="footerDiv">
      <div className="aboutUs-link">
        <div onClick={() => navigate("/")}>
          <IoMdHome
            href="/"
            style={{ marginBottom: "30px", fontSize: "25px" }}
          />
        </div>
        <div>
          <Link to="/aboutUs">AboutUs</Link>
        </div>
      </div>

      <div className="socialMedia">
        <h3>Follow Us!</h3>
        <ul>
          <li>
            <a href="https://www.instagram.com/">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/">
              <FaTiktok />
            </a>
          </li>
          <li>
            <a href="https://tr.pinterest.com/">
              <FaPinterest />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/">
              <FaYoutube />
            </a>
          </li>
          <li>
            <a href="https://open.spotify.com/">
              <FaSpotify />
            </a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <AddDropdown
          dropdownButton="choose language"
          options={languages}
          bgColor="null"
        />
      </div>
    </div>
  );
}

export default Footer;
