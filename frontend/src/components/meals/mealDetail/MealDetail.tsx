import { useState, type JSX } from "react";
import { type Meal, type Recipe } from "../../../api/apiClient";
import { RecipePopUp } from "../../recipes/recipePopUp/RecipePopUp";
import { getStarRating } from "../../getStarRating/getStarRating";

interface Props {
  meals: Meal[];
  recipes: Recipe[];
}

export function MealDetail(props: Props): JSX.Element {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<number>(0);

  return (
    <div>
      {props.meals.length === 0 && (
        <p>What&#8217;s cooking? Nothing apparently.</p>
      )}
      {props.meals.map((meal) => (
        <div key={meal.name}>
          <h3>{meal.name.toLowerCase()}</h3>
          {getStarRating(meal.rating)}
          {meal.comment && <p className="meal-comment">&ldquo;{meal.comment}&rdquo;</p>}
          <button
            className="recipe-info"
            onClick={() => {
              setShowPopUp(true);
              setSelectedRecipe(meal.recipe);
            }}
          >
            Recipe Information
          </button>
        </div>
      ))}

      <RecipePopUp
        showPopUp={showPopUp}
        closePopUp={() => setShowPopUp(false)}
        recipe={props.recipes.find((recipe) => recipe.id === selectedRecipe)}
      />
    </div>
  );
}
