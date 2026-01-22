import { useEffect, useState, type JSX } from "react";
import {
  getMeals,
  getRecipes,
  type Meal,
  type Recipe,
} from "../../../api/apiClient";
import { MealDetail } from "../mealDetail/MealDetail";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

const colours = ["#a7f8ef", "#f7fa6d", "#d5b3ff", "#ffd000", "#f086be"];

const getRandomColour = () => {
  const index = Math.floor(Math.random() * colours.length);
  return colours[index];
};

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

export function MealPicker(): JSX.Element {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [day, setDay] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(formatDate(day));
  const today = new Date();
  const [colour, setColour] = useState<string>(getRandomColour);

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
          setFormattedDate(formatDate(today));
          setDay(today);
          setColour(getRandomColour());
        }}
      >
        jump to today
      </button>
      <div
        className="post-it-card"
        style={{
          backgroundColor: colour,
          transition: "background-color 0.3s ease",
        }}
      >
        <div className="date-picker">
          <FaCircleArrowLeft
            onClick={() => {
              setFormattedDate(formatDate(changeDate(day, false)));
              setColour(getRandomColour());
            }}
            className="arrow-button"
          />
          <h2>{formattedDate}</h2>
          {day.toLocaleDateString() === today.toLocaleDateString() ? (
            <FaCircleArrowRight className="arrow-button disabled" />
          ) : (
            <FaCircleArrowRight
              onClick={() => {
                setFormattedDate(formatDate(changeDate(day, true)));
                setColour(getRandomColour());
              }}
              className="arrow-button"
            />
          )}
        </div>
        <MealDetail
          meals={meals.filter(
            (meal) =>
              new Date(meal.date_cooked).toLocaleDateString() ===
              day.toLocaleDateString(),
          )}
          recipes={recipes}
        />
      </div>
    </div>
  );
}
