import { useEffect, useState, type JSX } from "react";
import {
  getMeals,
  getRecipes,
  type Meal,
  type Recipe,
} from "../../../api/apiClient";
import { MealDetail } from "../mealDetail/MealDetail";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

export function MealPicker(): JSX.Element {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [day, setDay] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(formatDate(day));
  const today = new Date();

  function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return day + " " + months[month] + " " + year;
  }

  function changeDate(date: Date, increment: boolean) {
    if (increment) date.setDate(date.getDate() + 1);
    else date.setDate(date.getDate() - 1);
    setDay(date);
    return date;
  }

  useEffect(() => {
    getMeals()
      .then((response) => setMeals(response))
      .catch((err) => console.error(err));
    getRecipes().then((response) => setRecipes(response));
  }, []);

  return (
    <div className="meal-card">
        <button
        disabled={day.toLocaleDateString() === today.toLocaleDateString()}
        onClick={() => {
            setFormattedDate(formatDate(today))
            setDay(today)
        }}>Jump to today</button>
      <div className="date-picker">
        <FaCircleArrowLeft
          onClick={() => setFormattedDate(formatDate(changeDate(day, false)))}
          className="arrow-button"
        />
        <h2>{formattedDate}</h2>
        {day.toLocaleDateString() === today.toLocaleDateString() ? (
          <FaCircleArrowRight className="arrow-button disabled" />
        ) : (
          <FaCircleArrowRight
            onClick={() => setFormattedDate(formatDate(changeDate(day, true)))}
            className="arrow-button"
          />
        )}
      </div>
      <MealDetail
        meals={meals.filter(
          (meal) =>
            new Date(meal.date_cooked).toLocaleDateString() ===
            day.toLocaleDateString()
        )}
        recipes={recipes}
      />
    </div>
  );
}
