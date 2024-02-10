import React from "react";
import "../style/aboutus.css";
import background from "../image/bg.png";
import photo4 from "../image/aboutus4.png";
import photo5 from "../image/aboutus5.png";
import photo6 from "../image/aboutus6.png";
function AboutUs() {
  return (
    <div className="aboutUs-general">
      <div className="img-container">
        <img src={background} />
        <div className="aboutus-div">
          <h1>About Us</h1>
          <p>
            Hello and welcome! We are DayPlanner, here to make organizing your
            calendar and sharing plans easier. Life is busy, so we provide a
            solution for you. DayPlanner stands out with its user-friendly
            interface and feature richness. You can create a personalized
            calendar, organize your plans, and easily share them with others.
            Additionally, we've added a voting feature that allows you to
            interact with users through your calendar. Our goal is to help you
            manage your time better and facilitate interaction while you focus.
            While you concentrate, we organize your calendar. Thank you for
            choosing DayPlanner!
          </p>
        </div>
      </div>

      <div className="ourMission-div">
        <div className="ourMission-text">
          <h1>Our Mission</h1>
          <p>
            Our mission is to offer users a better time management and planning
            experience. At DayPlanner, we provide a solution that challenges the
            complexity of modern life. We aim to make every moment count and
            ensure that you don't miss out on important events. We continuously
            innovate to empower our users with more control and interaction in
            managing their plans. With our high-quality service and user-centric
            approach, DayPlanner strives every day to be better. We are here to
            provide you with a superior user experience and make your life
            easier. Thank you for journeying with us!
          </p>{" "}
        </div>
        <div className="images">
          <div style={{display: "flex"}}>
            <img
              src={photo4}
              className="images1"
            />
            <img
              src={photo6}
              className="images2"
            />
          </div>

          <img
            src={photo5}
            className="images3"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
