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
  },
});

export const { getFavoriteRecipes } = favoriteRecipesSlice.actions;

export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;
