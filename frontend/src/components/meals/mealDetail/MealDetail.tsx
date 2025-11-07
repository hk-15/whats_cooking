import { type JSX } from "react";
import { type Meal } from "../../../api/apiClient";
import { FaStar, FaRegStar } from "react-icons/fa6";

interface props {
  meals: Meal[];
}

export function MealDetail(props: props): JSX.Element {
  function getStarRating(rating: number) {
    switch (rating) {
      case 1:
        return (
          <div>
            <FaStar /> <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
          </div>
        );
      case 2:
        return (
          <div>
            <FaStar /> <FaStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
          </div>
        );
      case 3:
        return (
          <div>
            <FaStar /> <FaStar /> <FaStar /> <FaRegStar /> <FaRegStar />
          </div>
        );
      case 4:
        return (
          <div>
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaRegStar />
          </div>
        );
      case 5:
        return (
          <div>
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
          </div>
        );
      default:
        return (
          <div>
            <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />{" "}
            <FaRegStar />
          </div>
        );
    }
  }

  return (
    <div>
      {props.meals.map((meal) => (
        <div key={meal.name}>
          <h3>{meal.name}</h3>
          {getStarRating(meal.rating)}
          <p>{meal.comment}</p>
        </div>
      ))}
    </div>
  );
}
