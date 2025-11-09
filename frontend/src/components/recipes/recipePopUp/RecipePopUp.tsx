import { closePopUps } from "../../closePopUps/ClosePopUps";
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
  const ref = closePopUps(() => {
    closePopUp();
  });
console.log(recipe);
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
          {recipe.url_source && <a href={recipe.url_source} target="_blank">View the recipe</a>}
          {recipe.source && <p>{recipe.source}</p>}
          <p>Cooked {recipe.times_cooked === 1 ? "once" : `${recipe.times_cooked} times`}</p>
          <ul>
            {recipe.comments.map(comment => (
                <li>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// {
//     "id": 1,
//     "name": "Leek and Potato soup",
//     "url_source": "https://www.theguardian.com/food/2024/oct/30/how-to-make-leek-potato-soup-recipe-felicity-cloake",
//     "source": null,
//     "times_cooked": 3,
//     "average_rating": 5,
//     "comments": [
//         "not enough ingredients but it was still tasty",
//         "best recipe :-)",
//         "Worshipping at Felicity Cloake's feet"
//     ],
//     "meals": [
//         1,
//         2,
//         3
//     ]
// },
