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
      <div className="admin-form-container add-meal">
        <h2 className="no-margin-top">add a meal</h2>
        <AddMeal recipes={recipes} />
      </div>
      <div className="admin-form-container add-recipe">
        <h2 className="no-margin-top">add a recipe</h2>
        <AddRecipe getRefresh={setRefresh} />
      </div>
      <LogOutButton />
    </Page>
  );
}
