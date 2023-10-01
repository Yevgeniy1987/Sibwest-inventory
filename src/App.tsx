import { useEffect } from 'react';
import { Switch, Route } from 'wouter';

import './App.css';

import { InventoryMainTable } from './components/InventoryMainTable';
import { HistoryTable } from './components/HistoryTable';
import { LocationTable } from './components/LocationTable';

import { ItemForm } from './components/ItemForm';
import { useGlobalState } from './context/GlobalContext';
import { NavLink } from './components/NavLink';
import { LoginForm } from './components/LoginForm';
import { useAuthState } from './context/AuthContext';

function App() {
  const [, setState] = useGlobalState();
  const [authState] = useAuthState();
  const { logOut, isLogged, user } = authState;

  console.log({ authState });

  useEffect(() => {
    fetch('http://localhost:3333/items')
      .then((response) => response.json())
      .then((itemsData) =>
        setState((state) => ({ ...state, items: itemsData }))
      );

    fetch('http://localhost:3333/locations')
      .then((response) => response.json())
      .then((locationsData) =>
        setState((state) => ({ ...state, locations: locationsData }))
      );
  }, []);

  return (
    <main>
      <div className="container flex flex-col gap-3">
        {isLogged && (
          <div className='flex gap-1 items-center justify-end'>
            <p className="">Logged in as {user.email}</p>
            <button className="px-8 py-2 mt-1 border border-solid border-black rounded text-black hover:bg-gray-300" onClick={logOut}>Log out</button>
          </div>
        )}
        <h1 className="text-center w-full text-4xl font-bold bg-contain text-orange-300">
          Sibwest inventory table
        </h1>

        <nav className="mb-3 flex justify-center gap-3">
          <NavLink href="/main">Main</NavLink>
          <NavLink href="/history">History</NavLink>
          <NavLink href="/location">Location</NavLink>
          <NavLink href="/action">Action</NavLink>
          <NavLink href="/login">Login</NavLink>
        </nav>

        <Switch>
          <Route path="/main">
            <InventoryMainTable />
          </Route>
          <Route path="/history">
            <HistoryTable />
          </Route>
          <Route path="/location">
            <LocationTable />
          </Route>
          <Route path="/action">
            <ItemForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
        </Switch>
        {/* <div className="flex flex-col items-center">
          <ItemForm locations={locations} items={items} />
          <Nav></Nav>
        </div> */}
      </div>
    </main>
  );
}

export default App;

