import { useAuthState } from '../context/AuthContext';
import { api } from '../service/api';

export const LoginForm = () => {
  const [authState] = useAuthState();
  const { logIn } = authState;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const [loggedUser, loginError] = await api.post('/login', {
      email,
      password
    });

    if (loggedUser) {
      logIn(loggedUser)
    }

    console.log(loggedUser, loginError);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center">
      <input
        type="text"
        name="email"
        placeholder="email"
        value={'olivier@mail.com'}
      />
      <input
        type="text"
        name="password"
        placeholder="password"
        value={'bestPassw0rd'}
      />
      <button type="submit">Login</button>
    </form>
  );
};
