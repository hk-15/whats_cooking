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

export interface RecipeRequest {
  name: string;
  url_source?: string;
  source?: string;
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
  text: string;
  recipe: number;
  meal: number;
}

export interface User {
  username: string;
  password: string;
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
  const token = localStorage.getItem("token");
  const response = await fetch(`http://127.0.0.1:8000/meal/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Token ${token ? token : ""}`,
    },
    body: JSON.stringify(meal),
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
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

export async function addRecipe(recipe: RecipeRequest): Promise<Meal> {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://127.0.0.1:8000/recipe/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Token ${token ? token : ""}`,
    },
    body: JSON.stringify(recipe),
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    throw new Error(data);
  }
  return data;
}

export async function updateRecipeRatings(id: number, number: number) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://127.0.0.1:8000/recipe/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Token ${token ? token : ""}`,
    },
    body: JSON.stringify({ ratings_sum: number }),
  });
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    throw new Error(await response.json());
  }
}

export async function addComment(comment: CommentRequest) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://127.0.0.1:8000/comment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Token ${token ? token : ""}`,
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    throw new Error(await response.json());
  }
}

export async function logIn(user: User) {
  const response = await fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data);
  }
  return data;
}

export async function logOut() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://127.0.0.1:8000/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Token ${token ? token : ""}`,
    },
  });

  if (!response.ok) {
    throw new Error();
  } else localStorage.removeItem("token");
}
