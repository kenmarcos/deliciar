interface Ingredient {
  ingredient: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  video: string;
  ingredients: Ingredient[];
  directions: string;
  isFavorite: boolean;
}

export interface RecipeCreateFormValues {
  name: string;
  image: File;
  video: string;
  ingredients: Ingredient[];
  directions: string;
}
