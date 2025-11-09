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
        <div>
          <h3>{recipe.name}</h3>
          <p>Average rating: </p>
          {getStarRating(recipe.average_rating)}
          {recipe.url_source && (
            <a href={recipe.url_source} target="_blank">
              View the recipe
            </a>
          )}
          {recipe.source && <p>{recipe.source}</p>}
          <p>
            Cooked{" "}
            {recipe.times_cooked === 1
              ? "once"
              : `${recipe.times_cooked} times`}
          </p>
          <ul>
            {recipe.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
