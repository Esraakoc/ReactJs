import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  item: [],
  loading: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    gettedRecipe: (state, actions) => {
      state.recipes = actions.payload;
    },

    gettedItem: (state, actions) => {
      state.item = actions.payload;
    },

    sendId: (state, action) => {
      const itemId = action.payload.id;
      state.item = state.item.map((item) => {
        if (item.id === itemId) {
          return action.payload;
        }
        return item;
      });
    },

    startLoading: (state) => {
      state.loading = true;
    },

    stopLoading: (state) => {
      state.loading = false;
    },

    addedRecipe: (state, actions) => {
      state.recipes.push(actions.payload);
    },
  },
});

export const {
  gettedRecipe,
  gettedItem,
  sendId,
  startLoading,
  stopLoading,
  addedRecipe,
} = recipeSlice.actions;
export default recipeSlice.reducer;
