import React from "react";
import {Slider} from "@mui/material";
import "../styleScss/home.css";
import {useSelector} from "react-redux";
import HomeList from "./HomeList";

function Home() {
  const {recipes} = useSelector((state) => {
    return state.recipe;
  });

  const [value, setValue] = React.useState([0, 5]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.rating >= value[0] && recipe.rating <= value[1]
  );

  return (
    <div className="homeDiv">
      <h6>You can filter recipes based on food scores.</h6>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={5}
        marks={[
          {value: 0, label: "0"},
          {value: 5, label: "5"},
        ]}
      />
      <div className="homeMap">
        {filteredRecipes.map((rec, index) => {
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
