import type { JSX } from "react";
import { MealPicker } from "../../components/meals/mealPicker/MealPicker";
import { Page } from "../page/Page";
import "./Home.scss";

export function Home(): JSX.Element {
  return (
    <Page>
        <MealPicker />
    </Page>
  );
}
