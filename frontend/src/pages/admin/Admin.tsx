import type { JSX } from "react";
import { Page } from "../page/Page";
import { AddMeal } from "../../components/admin/addMeal/AddMeal";

export function Admin(): JSX.Element {
  return (
    <Page>
        <AddMeal />
    </Page>
  );
}
