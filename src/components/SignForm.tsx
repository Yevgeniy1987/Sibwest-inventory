import { useState } from "react";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import classNames from "classnames";

export const SignForm = () => {
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);

  return <>
      {isRegisterFormOpen && <RegisterForm />}
      {!isRegisterFormOpen && <LoginForm />}
      
      <div>
        <button
          onClick={() => setIsRegisterFormOpen((p) => !p)}
          className={classNames(
            "px-8 py-4 bg-red-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white"
          )}
        >
          {isRegisterFormOpen ? 'Go to Login' : 'Go to Register'}
        </button>
      </div>
  </>
}