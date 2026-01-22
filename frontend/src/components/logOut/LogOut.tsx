import { useContext } from "react";
import { LoginContext } from "../loginManager/LoginContext";
import { logOut } from "../../api/apiClient";

export default function LogOutButton() {
  const loginContext = useContext(LoginContext);

  const performLogOut = async () => {
    try {
      await logOut();
      loginContext.logOut();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Something went wrong while logging out.");
    }
  };

  return (
    <button className="logout-button" onClick={performLogOut}>
      log out
    </button>
  );
}
