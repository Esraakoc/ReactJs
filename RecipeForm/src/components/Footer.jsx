import React from "react";
import "../styleScss/footer.css";
import {Link} from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import {useTranslation} from "react-i18next";

function Footer() {
  const redirectToFacebook = () => {
    window.open("https://tr-tr.facebook.com/", "_blank");
  };
  const redirectToInstagram = () => {
    window.open("https://www.instagram.com/", "_blank");
  };
  const redirectToYoutube = () => {
    window.open("https://www.youtube.com/", "_blank");
  };
  const redirectToTwitter = () => {
    window.open("https://twitter.com/", "_blank");
  };
  const {t} = useTranslation();
  return (
    <div className="footerDiv">
      <div className="footer">
        <div className="footerCompanyDiv">
          <h1 className="footerH1">{t("Company_Footer")}</h1>
          <nav className="footerLinks">
            <Link to="/aboutus">{t("About_Us")}</Link>
          </nav>
        </div>
        <div className="footerSocialMediaDiv">
          <h1 className="socialMeadia">{t("Social_Media")}</h1>
          <div className="footerIcons">
            <button
              className="facebookBtn"
              onClick={redirectToFacebook}
            >
              <FacebookIcon />
            </button>
            <button
              className="instagramBtn"
              onClick={redirectToInstagram}
            >
              <InstagramIcon />
            </button>
            <button
              className="youtubeBtn"
              onClick={redirectToYoutube}
            >
              <YouTubeIcon />
            </button>
            <button
              className="twitterBtn"
              onClick={redirectToTwitter}
            >
              <TwitterIcon />
            </button>
          </div>
        </div>
      </div>
      <p className="footerCOPYRIGHT">{t("Information_Navbar")}</p>
    </div>
  );
}

export default Footer;
