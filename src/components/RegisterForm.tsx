import classNames from "classnames";
import { FormEvent, useState } from "react";
import { api } from "../service/api";
import { useAuthState } from "../context/AuthContext";
import { useGlobalState } from "../context/GlobalContext";


export const RegisterForm = () => {
  const [, setState] = useGlobalState();

  const [error, setError] = useState(null);

  const [authState] = useAuthState();
  const { logIn } = authState;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const newUser = {
      email,
      password,
    };

    const [createdUser, createdUserError] = await api.post(`/users`, newUser);

    if (createdUser) {
      logIn(createdUser);
    }

    if (createdUserError) {
      setError(createdUserError);
    }
    console.log(createdUser, createdUserError);
  };

  const errorMessage = error ? (
    <div className="text-red-500">{error.response?.data}</div>
  ) : null;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2 items-center justify-center">
        <input
          type="email"
          name="email"
          placeholder="email"
          className="border p-1 border-solid rounded border-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="border p-1 border-solid rounded border-black"
          required
        />

        {errorMessage}
        <button
          type="submit"
          className={classNames(
            "px-8 py-4 mt-3 bg-green-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white"
          )}
        >
          Register
        </button>
      </div>
    </form>
  );
};
