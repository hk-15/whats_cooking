import { useContext, useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { logIn, type FormStatus } from "../../api/apiClient";
import { LoginContext } from "../loginManager/LoginContext";

export const LoginForm: React.FC = (): JSX.Element => {
  const [status, setStatus] = useState<FormStatus>("READY");
  const [error, setError] = useState<string>("");
  const loginContext = useContext(LoginContext);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function submitForm(data: { username: string; password: string }) {
    setStatus("SUBMITTING");
    logIn(data)
      .then((response) => {
        loginContext.logIn(response.token, response.user.username);
        setStatus("FINISHED");
      })
      .catch((err) => {
        setStatus("ERROR");
        setError("Login failed. " + err.message);
      });
  }

  return (
    <form className="account-form" onSubmit={handleSubmit(submitForm)}>
      <label htmlFor="username">
        Username
        <input
          required
          type="text"
          id="username"
          {...register("username", { required: true })}
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          required
          id="password"
          type="password"
          {...register("password", { required: true })}
        />
      </label>

      <button
        className="account-button"
        disabled={status === "SUBMITTING"}
        type="submit"
      >
        Log In
      </button>
      {status === "ERROR" && <p>{error}.</p>}
    </form>
  );
};
