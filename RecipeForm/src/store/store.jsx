import {configureStore} from "@reduxjs/toolkit";
import recipeReducer from "./slices/recipeSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
  middleware: [thunk],
});
