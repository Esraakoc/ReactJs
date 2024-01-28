import React from "react";
import "../styleScss/meals.css";
import {useDispatch, useSelector} from "react-redux";
import {sendItemActions} from "../../Api";
import {useNavigate} from "react-router-dom";

function ColdDishes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {recipes} = useSelector((state) => {
    return state.recipe;
  });
  const handleClickRecipe = (id) => {
    dispatch(sendItemActions(id));
    navigate("/recipe");
  };
  const Category = recipes.filter((item) => item.category === "Bread");
  return (
    <div className="MealsDiv">
      <div className="mealsMapDiv">
        {Category.map((item) => (
          <div
            key={item.index}
            className="mealsMap"
          >
            <button onClick={() => handleClickRecipe(item.id)}>
              <h2>{item.foodName}</h2>
              <img
                src={item.img}
                alt={item.foodName}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColdDishes;
