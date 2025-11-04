import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <h1>
        <NavLink to="/">What’s Cooking</NavLink>
      </h1>
    </header>
  );
}
