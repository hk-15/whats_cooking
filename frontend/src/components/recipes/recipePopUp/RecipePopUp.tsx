import { ClosePopUps } from "../../closePopUps/ClosePopUps";
import type { Recipe } from "../../../api/apiClient";
import { getStarRating } from "../../getStarRating/getStarRating";

type Props = {
  showPopUp: boolean;
  closePopUp: () => void;
  recipe: Recipe | undefined;
};

export const RecipePopUp: React.FC<Props> = ({
  showPopUp,
  closePopUp,
  recipe,
}) => {
  const ref = ClosePopUps(() => {
    closePopUp();
  });

  if (!showPopUp) {
    return null;
  }
  return (
    <div className="pop-up" ref={ref}>
      <button className="close-button" onClick={closePopUp}>
        x
      </button>
      {!recipe ? (
        <p>No recipe found...</p>
      ) : (
        <div className="pop-up-content">
          <h3 className="recipe-name">{recipe.name}</h3>
          <div className="flex-container">
            <div>
              <p className="no-margin-bottom recipe-label">Cooked</p>

              {recipe.times_cooked === 1
                ? "once"
                : recipe.times_cooked === 2
                ? "twice"
                : `${recipe.times_cooked} times`}
            </div>
            <div className="recipe-rating">
              <p className="no-margin-bottom recipe-label">Average rating</p>
              {getStarRating(recipe.average_rating)}
            </div>
          </div>
          {recipe.source && (
            <div>
              <p className="no-margin-bottom recipe-label">Recipe</p>{" "}
              {recipe.source}
            </div>
          )}
          {recipe.url_source && !recipe.source && <p className="no-margin-bottom recipe-label">Recipe</p>}
          {recipe.url_source && (
            <a href={recipe.url_source} target="_blank">
              View the recipe
            </a>
          )}
          {recipe.comments.length !== 0 && (
            <div>
              <p className="recipe-label">Comments</p>
              <ul className="recipe-comments">
                {recipe.comments.map((comment) => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
