import { useContext, type JSX } from "react";
import { Page } from "../page/Page";
import { AddMeal } from "../../components/admin/addMeal/AddMeal";
import { LoginForm } from "../../components/loginForm/LoginForm";
import { LoginContext } from "../../components/loginManager/LoginContext";

export function Admin(): JSX.Element {
  const loginContext = useContext(LoginContext);

  if (loginContext.token === "") {
    return (
      <Page>
        <LoginForm />
      </Page>
    );
  }

  return (
    <Page>
      <AddMeal />
    </Page>
  );
}
