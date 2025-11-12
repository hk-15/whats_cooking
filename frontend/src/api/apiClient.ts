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
}

export interface Recipe {
  id: number;
  name: string;
  url_source?: string;
  source?: string;
  ratings_sum: number;
  comments: string[];
  meals: number[];
}

export const emptyRecipe: Recipe = {
  id: 0,
  name: "",
  url_source: "",
  source: "",
  ratings_sum: 0,
  comments: [],
  meals: [],
};

export interface CommentRequest {
  text: string,
  recipe: number,
  meal: number
}

export async function getMeals(): Promise<Meal[]> {
  const response = await fetch(`http://127.0.0.1:8000/meal/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function addMeal(meal: MealRequest): Promise<Meal> {
  const response = await fetch(`http://127.0.0.1:8000/meal/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data);
  }
  return data;
}

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`http://127.0.0.1:8000/recipe/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function updateRecipeRatings(id: number, number: number) {
  const response = await fetch(`http://127.0.0.1:8000/recipe/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"ratings_sum": number}),
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
}

export async function addComment(comment: CommentRequest) {
  const response = await fetch(`http://127.0.0.1:8000/comment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
}