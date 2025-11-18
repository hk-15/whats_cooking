import { useContext, type JSX } from "react";
import { Page } from "../page/Page";
import { AddMeal } from "../../components/admin/addMeal/AddMeal";
import { LoginContext } from "../../components/loginManager/LoginManager";
import { LoginForm } from "../../components/loginForm/LoginForm";

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
