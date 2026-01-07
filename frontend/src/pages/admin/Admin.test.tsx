import {
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Admin } from "./Admin";

describe("Admin page", () => {

    test("renders the log in page when not logged in", () => {
        render(< Admin />);

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    })
})