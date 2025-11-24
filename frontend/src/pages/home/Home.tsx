import { useContext, type JSX } from "react";
import { MealPicker } from "../../components/meals/mealPicker/MealPicker";
import { Page } from "../page/Page";
import "./Home.scss";
import { LoginContext } from "../../components/loginManager/LoginContext";

export function Home(): JSX.Element {
  const loginContext = useContext(LoginContext);

  return (
    <Page>
      {loginContext.token && (
        <button onClick={() => (window.location.href = "admin/")}>
          Admin dashboard
        </button>
      )}
      <MealPicker />
    </Page>
  );
}
