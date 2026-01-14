import { useContext, useEffect, useState, type JSX } from "react";
import { Page } from "../page/Page";
import { AddMeal } from "../../components/admin/addMeal/AddMeal";
import { LoginForm } from "../../components/loginForm/LoginForm";
import { LoginContext } from "../../components/loginManager/LoginContext";
import LogOutButton from "../../components/logOut/LogOut";
import { AddRecipe } from "../../components/admin/addRecipe/AddRecipe";
import { getRecipes, type Recipe } from "../../api/apiClient";
import "./Admin.scss";

export function Admin(): JSX.Element {
  const loginContext = useContext(LoginContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getRecipes()
      .then((response) => {
        setRecipes(response);
        setRefresh(false);
      })
      .catch((error) => console.error(error));
  }, [refresh]);

  if (loginContext.token === "") {
    return (
      <Page>
        <LoginForm />
      </Page>
    );
  }

  return (
    <Page>
      <h2>Add a Meal</h2>
      <AddMeal recipes={recipes} />
      <h2>Add a Recipe</h2>
      <AddRecipe getRefresh={setRefresh} />
      <LogOutButton />
    </Page>
  );
}
