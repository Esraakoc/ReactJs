import React from "react";
import "../styleScss/home.css";
import {useSelector} from "react-redux";
import HomeList from "./HomeList";

function Home() {
  const {recipes} = useSelector((state) => {
    return state.recipe;
  });
  return (
    <div className="homeDiv">
      <div className="homeMap">
        {recipes.map((rec, index) => {
          return (
            <HomeList
              key={index}
              {...rec}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
