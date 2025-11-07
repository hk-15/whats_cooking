import { NavLink } from "react-router-dom";
import "./Header.scss";

export function Header() {
  return (
    <header className="header">
      <h1>
        <NavLink to="/">What&#8217;s Cooking</NavLink>
      </h1>
    </header>
  );
}
