import classNames from "classnames";
import { FormEvent } from "react";
import { api } from "../service/api";
import { useAuthState } from "../context/AuthContext";
import { useGlobalState } from "../context/GlobalContext";

export const UserRegisterForm = () => {
  const [, setState] = useGlobalState();

  const [authState] = useAuthState();
  const { signUp } = authState;

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

    const [createdUser] = await api.post(`/users`, newUser);

    setState((state) => ({ ...state, users: [...state.users, createdUser] }));

    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-2 items-center justify-center">
          <input
            type="text"
            name="email"
            placeholder="email"
            className="border p-1 border-solid rounded border-black"
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            className="border p-1 border-solid rounded border-black "
          />
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
};
