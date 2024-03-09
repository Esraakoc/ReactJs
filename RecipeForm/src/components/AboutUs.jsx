import React from "react";
import "../styleScss/aboutUs.css";
import aboutUsImage from "../images/aboutUs.png";
import {useTranslation} from "react-i18next";

function AboutUs() {
  const {t} = useTranslation();
  return (
    <div className="aboutUsDiv">
      <img src={aboutUsImage} />
      <h1>{t("About_Us")}</h1>
      <label>{t("Explain_AU")}</label>
      <h1>{t("OurMission_AU")}</h1>
      <label>{t("Explain_OM")}</label>
      <h1> {t("What_We_Offer")}</h1>
      <div className="aboutUsFlex">
        <h3>{t("Recipe_Collection")}</h3>
        <label>{t("Explain_RC")}</label>
      </div>
      <div className="aboutUsFlex" >
        <h3>PersonalRecipes:</h3  >
        <label>
          You can share your culinary experiences with us. By becoming a member,
          you can add your own recipes through the "addRecipe" page. Capture
          your dishes with photographs and share the ingredients, preparation
          steps, and tips.
        </label>
      </div>
      <div className="aboutUsFlex">
        <h3> Community:</h3>
        <label>
          We aim to create a meeting point for kitchen enthusiasts. You can
          leave comments under recipes, share your experiences, and interact
          with other members.
        </label>
      </div>
      <h1>Membership and Your Contributions</h1>
      <label>
        Becoming a member is entirely free. As a member, you can take full
        advantage of the features our site offers. Furthermore, you can
        contribute to this flavor-filled community by adding your own recipes.
      </label>
      <h1>Who Are We?</h1>
      <label>
        We are a group of passionate home chefs and gourmet food lovers who
        simply adore cooking. A shared love for exploring and sharing flavors
        brought us together. When creating our site, we aimed to do our very
        best to make your culinary experiences more enjoyable.
      </label>
      <h1>Contact Us</h1>
      <label>
        Feel free to reach out to us with any questions, suggestions, or
        feedback. You can contact us through our Contact page. Welcome to a
        culinary adventure full of flavor! Enjoy exploring our site!
      </label>
    </div>
  );
}

export default AboutUs;
