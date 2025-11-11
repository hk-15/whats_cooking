import { useEffect, useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import {
  addComment,
  addMeal,
  getRecipes,
  type FormStatus,
  type Recipe,
} from "../../../api/apiClient";
import { SearchableDropdown } from "../../searchableDropdown/SearchableDropdown";
import { FaStar } from "react-icons/fa6";

export function AddMeal(): JSX.Element {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{
    label: string;
    value: number;
  }>({ label: "", value: 0 });
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const [formStatus, setFormStatus] = useState<FormStatus>("READY");
  const [formErrors, setFormErrors] = useState({ recipe: "", rating: "" });

  useEffect(() => {
    getRecipes()
      .then((response) => setRecipes(response))
      .catch((error) => console.error(error));
  }, []);

  const colors = {
    black: "#000000ff",
    grey: "#aaa4a4ff",
  };
  const stars = Array(5).fill(0);

  const handleMouseOverStar = (value: number) => {
    setHoverValue(value);
  };

  const handleMouseLeaveStar = () => {
    setHoverValue(undefined);
  };

  const handleClickStar = (value: number) => {
    setRating(value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      date_cooked: "",
      comment: "",
    },
  });

  async function submitForm(data: {
    name: string;
    date_cooked: string;
    comment: string;
  }) {
    if (selectedRecipe.value === 0) {
      setFormErrors({
        recipe: "Please select a recipe.",
        rating: "",
      });
      return;
    }
    if (selectedRecipe.value === 0) {
      setFormErrors({
        recipe: "",
        rating: "Please rate your meal.",
      });
      return;
    }
    try {
      setFormStatus("SUBMITTING");
      const mealData = {
        name: data.name,
        recipe: selectedRecipe.value,
        date_cooked: data.date_cooked,
        rating: rating,
      };
      const newMeal = await addMeal(mealData);
      console.log(newMeal.id);
      const commentData = {
        text: data.comment,
        recipe: selectedRecipe.value,
        meal: newMeal.id,
      };
      addComment(commentData);
      setFormStatus("FINISHED");
      reset();
      setShowMessage(true);
      setFadeOut(false);
      setTimeout(() => {
        setFadeOut(true);
      }, 3000);
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <SearchableDropdown
          dropdownItems={recipes.map(({ name, id }) => ({ name, id }))}
          placeholderText={"Select a recipe"}
          getSelected={setSelectedRecipe}
        />
        {formErrors.recipe && (
          <span className="form-error">{formErrors.recipe}</span>
        )}
        <label htmlFor="name">
          Name *
          <input
            id="name"
            type="text"
            {...register("name", {
              required: true,
              pattern: {
                value: /^.{1,100}/,
                message: "Name must be between 1 and 100 characters long.",
              },
            })}
          />
        </label>
        {errors.name && (
          <span className="form-error">{errors.name.message}</span>
        )}
        <label htmlFor="date_cooked">
          Date *
          <input
            id="date_cooked"
            type="date"
            {...register("date_cooked", { required: true })}
          />
        </label>
        {errors.date_cooked && (
          <span className="form-error">{errors.date_cooked.message}</span>
        )}
        <label htmlFor="comment">
          Comments
          <input id="comment" type="text" {...register("comment")} />
        </label>
        <div>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onChange={(e) => setRating(Number(e.currentTarget))}
                color={
                  (hoverValue || rating) > index ? colors.black : colors.grey
                }
                onClick={() => handleClickStar(index + 1)}
                onMouseOver={() => handleMouseOverStar(index + 1)}
                onMouseLeave={() => handleMouseLeaveStar()}
              />
            );
          })}
          {formErrors.rating && (
            <span className="form-error">{formErrors.rating}</span>
          )}
        </div>
        <button disabled={formStatus === "SUBMITTING"} type="submit">
          Log meal
        </button>
        {formStatus === "ERROR" && (
          <p>Something went wrong. Please try again.</p>
        )}
        {formStatus === "FINISHED" && showMessage && (
          <p className={`message ${fadeOut ? "fade-out" : ""}`}>Success!</p>
        )}
      </form>
    </div>
  );
}
