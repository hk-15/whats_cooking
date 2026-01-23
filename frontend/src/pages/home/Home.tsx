import { useContext, type JSX } from "react";
import { MealPicker } from "../../components/meals/mealPicker/MealPicker";
import { Page } from "../page/Page";
import "./Home.scss";
import { LoginContext } from "../../components/loginManager/LoginContext";

export function Home(): JSX.Element {
  const loginContext = useContext(LoginContext);

  return (
    <Page>
      <MealPicker />
      {loginContext.token && (
        <button
          className="admin-button"
          onClick={() => (window.location.href = "admin/")}
        >
          admin dashboard
        </button>
      )}
    </Page>
  );
}
