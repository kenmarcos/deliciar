import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "store/slices/recipesSlice";
import { favoriteRecipesReducer } from "./slices/favoriteRecipesSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favoriteRecipes: favoriteRecipesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
