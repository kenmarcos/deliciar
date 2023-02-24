import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "types";

const initialState: Recipe[] = [];

const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes",
  initialState,
  reducers: {
    getFavoriteRecipes: (state, action) => {
      return [...action.payload];
    },
    addInFavoriteRecipes: (state, action) => {
      return [...state, action.payload];
    },
    removeFromFavoriteRecipes: (state, action) => {
      return state.filter((recipe) => recipe.id !== action.payload);
    },
  },
});

export const {
  getFavoriteRecipes,
  addInFavoriteRecipes,
  removeFromFavoriteRecipes,
} = favoriteRecipesSlice.actions;

export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;
