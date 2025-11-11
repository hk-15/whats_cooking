export type FormStatus = "READY" | "SUBMITTING" | "FINISHED" | "ERROR";

export interface Meal {
  id: number;
  name: string;
  recipe: number;
  rating: number;
  date_cooked: string;
  comment?: string;
}

export interface MealRequest {
  name: string;
  recipe: number;
  rating: number;
  date_cooked: string;
  comment?: string;
}

export interface Recipe {
  id: number;
  name: string;
  url_source?: string;
  source?: string;
  times_cooked: number;
  average_rating: number;
  comments: string[];
  meals: number[];
}

export const emptyRecipe: Recipe = {
  id: 0,
  name: "",
  url_source: "",
  source: "",
  times_cooked: 0,
  average_rating: 0,
  comments: [],
  meals: [],
};

export async function getMeals(): Promise<Meal[]> {
  const response = await fetch(`http://127.0.0.1:8000/meal/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function addMeal(meal: MealRequest) {
  const response = await fetch(`http://127.0.0.1:8000/meal/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`http://127.0.0.1:8000/recipe/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
