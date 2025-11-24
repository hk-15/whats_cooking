import { NavLink } from "react-router-dom";
import "./Header.scss";
import LogOutButton from "../logOut/LogOut";
import { useContext } from "react";
import { LoginContext } from "../loginManager/LoginContext";

export function Header() {
  const loginContext = useContext(LoginContext);

  return (
    <div>
      <header className="header">
        <h1>
          <NavLink to="/">What&#8217;s Cooking</NavLink>
        </h1>
      </header>
      {loginContext.token && (
        <nav>
          <NavLink to="/admin">Log a meal</NavLink>
          <LogOutButton />
        </nav>
      )}
    </div>
  );
}
