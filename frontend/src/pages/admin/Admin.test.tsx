import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Admin } from "./Admin";
import { LoginContext } from "../../components/loginManager/LoginContext";

describe("Admin page", () => {
  function renderLoggedInPage(user: {
    token: string;
    username: string;
    logIn: (token: string, username: string) => void;
    logOut: () => void;
  }) {
    return render(
      <LoginContext.Provider value={user}>
        <Admin />
      </LoginContext.Provider>
    );
  }

  test("renders the log in page when not logged in", () => {
    render(<Admin />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders the add meal and recipe forms when logged in", () => {
    const user = {
      token: "token",
      username: "username",
      logIn: jest.fn(),
      logOut: jest.fn(),
    };

    renderLoggedInPage(user);

    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comments/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /log meal/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/other source/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add recipe/i })
    ).toBeInTheDocument();
  });
});
