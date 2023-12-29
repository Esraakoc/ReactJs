import React from "react";
import "../styleScss/home.css";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {sendItemActions} from "../../Api";

function HomeList(recipes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickRecipe = (id) => {
    dispatch(sendItemActions(id));
    navigate("/recipe");
  };

  return (
    <div>
      <button
        className="homeLBtn"
        onClick={() => handleClickRecipe(recipes.id)}
      >
        <h3 className="homeLName">{recipes.foodName}</h3>
        <img
          style={{width: "30vw"}}
          src={recipes.img}
        />
      </button>
    </div>
  );
}

export default HomeList;
