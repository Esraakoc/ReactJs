import axios from "axios";
import {
  addedRecipe,
  gettedItem,
  gettedRecipe,
  sendId,
  startLoading,
  stopLoading,
} from "./src/store/slices/recipeSlice";

export const gettedRecipeActions = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3000/recipes");
  dispatch(gettedRecipe(response.data));
};

export const gettedItemActions = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3000/item");
  dispatch(gettedItem(response.data));
};

export const addedRecipeActions = (newData) => async (dispatch) => {
  const response = await axios.post("http://localhost:3000/recipes", newData);
  dispatch(addedRecipe(response.data));
};

export const sendItemActions = (id) => async (dispatch, getState) => {
  dispatch(startLoading());
  const key = 1;
  const {recipes} = getState().recipe;
  const findItem = recipes.find((item) => item.id === id);
  const response = await axios.put(
    `http://localhost:3000/item/${key}`,
    findItem
  );
  dispatch(sendId(response.data));
  dispatch(stopLoading());
};
