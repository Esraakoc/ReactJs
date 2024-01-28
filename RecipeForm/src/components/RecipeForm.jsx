import React from "react";
import {useSelector} from "react-redux";
import {Box, Rating, Typography} from "@mui/material";
import "../styleScss/recipeForm.css";
function RecipeForm() {
  const {item, loading} = useSelector((state) => {
    return state.recipe;
  });

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        item.map((state) => (
          <div
            className="recipeFDiv"
            key={state.id}
          >
            <div className="recipeFNameImg">
              <h1>{state.foodName} Recipe</h1>
              <img
                style={{width: "30vw"}}
                src={state.img}
              />
            </div>
            <div className="RecipeFingPre">
              {" "}
              <Box sx={{marginLeft: "100px"}}>
                <Typography>Rate this recipe:</Typography>
                {/* Rating component*/}
                <Rating
                  name="recipe-rating"
                  value={item.rating}
                  precision={0.5}
                  sx={{fontSize: "40px"}}
                />
              </Box>
              <h2>Ingredients for {state.foodName} Recipe</h2>
              <h5>{state.ingredients}</h5>
              <h2>Making {state.foodName} recipe</h2>
              <h5>{state.preparation}</h5>{" "}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeForm;
