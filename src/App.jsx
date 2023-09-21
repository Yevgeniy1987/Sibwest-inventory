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

function App() {
  const [_, setState] = useGlobalState();

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
            <ItemForm  />
          </Route>
          <Route path="/login">
            <LoginForm/>
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

// AIIFE

// (async function (){
//   //body here
// })()
