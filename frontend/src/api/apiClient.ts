export interface Meal {
    id: number,
    name: string,
    recipeId: number,
    rating: number,
    dateCooked: string,
    comment?: string
}

export interface Recipe {
    id : number,
    name: string,
    url?: string,
    source?: string,
    times_cooked: number,
    average_rating: number,
    comments: string[]
    meals: number[]
}

export async function getMeals(): Promise<Meal[]> {
    const response = await fetch(`http://127.0.0.1:8000/meal/`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

export async function getRecipes(): Promise<Recipe[]> {
    const response = await fetch(`http://127.0.0.1:8000/recipe/`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}