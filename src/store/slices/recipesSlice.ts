import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "types";

const initialState: Recipe[] = [];

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    getAllRecipes: (state, action) => {
      return [...action.payload];
    },
    addRecipe: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { getAllRecipes, addRecipe } = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
