import type { JSX } from "react";
import { MealPicker } from "../../components/meals/mealPicker/MealPicker";
import { Page } from "../page/Page";

export function Home(): JSX.Element {
  return (
    <Page>
        <MealPicker />
    </Page>
  );
}
