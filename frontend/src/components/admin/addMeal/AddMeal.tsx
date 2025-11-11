import { useEffect, useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import {
  addMeal,
  getRecipes,
  type FormStatus,
  type Recipe,
} from "../../../api/apiClient";
import { SearchableDropdown } from "../../searchableDropdown/SearchableDropdown";

export function AddMeal(): JSX.Element {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{
    label: string;
    value: number;
  }>({ label: "", value: 0 });
  const [formStatus, setFormStatus] = useState<FormStatus>("READY");

  useEffect(() => {
    getRecipes()
      .then((response) => setRecipes(response))
      .catch((error) => console.error(error));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      rating: 0,
      date_cooked: "",
      comment: "",
    },
  });

  function submitForm(data: {
    name: string;
    rating: number;
    date_cooked: string;
    comment: string;
  }) {
    setFormStatus("SUBMITTING");
    const mealData = {
      name: data.name,
      recipe: selectedRecipe.value,
      date_cooked: data.date_cooked,
      comment: data.comment,
      rating: 0,
    };
    addMeal(mealData)
      .then(() => {
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
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <SearchableDropdown
          dropdownItems={recipes.map(({ name, id }) => ({ name, id }))}
          placeholderText={"Select a recipe or create a new one"}
          getSelected={setSelectedRecipe}
        />
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
