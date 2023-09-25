import classNames from "classnames";
import { useAuthState } from "../context/AuthContext";
import { api } from "../service/api";
import { useState } from "react";



export const LoginForm = () => {
  const [authState] = useAuthState();
  const { logIn } = authState;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const [loggedUser, loginError] = await api.post("/login", {
      email,
      password,
    });

    if (loggedUser) {
      logIn(loggedUser);
    }

    console.log(loggedUser, loginError);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 items-center justify-center"
    >
      <input
        type="text"
        name="email"
        placeholder="email"
        value={"olivier@mail.com"}
        className="border p-1 border-solid rounded border-black w-full"
      />
      <input
        type="text"
        name="password"
        placeholder="password"
        value={"bestPassw0rd"}
        className="border p-1 border-solid rounded border-black w-full"
      />
      <button
        type="submit"
        className={classNames(
          "px-8 py-4 mt-3 bg-green-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white",
          isLoading && "bg-gray-400"
        )}
      >
        Login
      </button>
    </form>
  );
};
