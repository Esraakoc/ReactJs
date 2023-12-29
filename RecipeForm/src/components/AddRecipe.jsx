import React, {useState} from "react";
import "../styleScss/addRecipes.css";
import {useDispatch} from "react-redux";
import {addedRecipeActions} from "../../Api";
import Notification, {showNotification} from "../Notification";

function AddRecipe() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [foodName, setFoodName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [img, setImg] = useState("");
  //onChange to handleChange arrowFunciton
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeFoodName = (e) => {
    setFoodName(e.target.value);
  };
  const handleChangeIngredients = (e) => {
    setIngredients(e.target.value);
  };
  const handleChangePreparation = (e) => {
    setPreparation(e.target.value);
  };
  //onSubmiy to handleAdded arrowFunciton
  const handleAdded = (e) => {
    e.preventDefault();
    const newData = {category, foodName, ingredients, preparation, img};
    dispatch(addedRecipeActions(newData));
    setCategory("");
    setFoodName("");
    setIngredients("");
    setPreparation("");
    showNotification("info", "Added Recipe", "Added", 3000);
  };

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      setImg(imageSrc);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="addDiv">
      <form
        className="addForm"
        onSubmit={handleAdded}
      >
        <Notification />
        <h4 className="addType">Type of Food</h4>
        <select
          value={category}
          onChange={handleChangeCategory}
        >
          <option value="">Please choose a type of meal</option>
          <option value="Dessert">Dessert</option>
          <option value="Soup">Soup</option>
          <option value="Bread">Bread</option>
        </select>
        <h4 className="addType">Name of the Food</h4>
        <input
          className="addName"
          value={foodName}
          onChange={handleChangeFoodName}
        />
        <h4 className="addType">Ingredients of the Food</h4>
        <textarea
          value={ingredients}
          onChange={handleChangeIngredients}
        />
        <h4 className="addType">Preparation of the Food</h4>
        <textarea
          value={preparation}
          onChange={handleChangePreparation}
        />
        <h4 className="addType">Add Photo</h4>
        <input
          className="DosyaSec"
          type="file"
          onChange={handleFileUpload}
        />
        <div>
          <button className="addBtn">Publish</button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
