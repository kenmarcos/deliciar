export interface Recipe {
  id: string;
  name: string;
  image: string;
  video: string;
  ingredients: string[];
  directions: string;
  isFavorite: boolean;
}
