import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { addRecipe, type FormStatus } from "../../../api/apiClient";

interface Props {
    getRefresh: (boolean: boolean) => void;
}

export function AddRecipe(props: Props): JSX.Element {
  const [showMessage, setShowMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("READY");
  const [formErrors, setFormErrors] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      recipeName: "",
      url_source: "",
      source: "",
    },
  });

  async function submitForm(data: {
    recipeName: string;
    url_source?: string;
    source?: string;
  }) {
    if (!data.url_source && !data.source) {
      setFormErrors(
        "Please provide a source either as a link or in the source text box"
      );
      return;
    }
    try {
      setFormStatus("SUBMITTING");
      const recipeData = {
        name: data.recipeName,
        url_source: data.url_source,
        source: data.source,
      };
      await addRecipe(recipeData);
      setFormStatus("FINISHED");
      reset();
      props.getRefresh(true);
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
        <label htmlFor="recipeName">
          Name *
          <input
            id="recipeName"
            type="text"
            {...register("recipeName", {
              required: true,
              pattern: {
                value: /^.{1,100}/,
                message: "Name must be between 1 and 100 characters long.",
              },
            })}
          />
        </label>
        {errors.recipeName && (
          <span className="form-error">{errors.recipeName.message}</span>
        )}
        <label htmlFor="url_source">
          Link
          <input id="url_source" type="url" {...register("url_source")} />
        </label>
        <label htmlFor="source">
          Other source
          <input id="source" type="text" {...register("source")} />
        </label>
        {formErrors && <span className="form-error">{formErrors}</span>}
        <button disabled={formStatus === "SUBMITTING"} type="submit">
          Add recipe
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
