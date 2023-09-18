import { useEffect, useState } from "react";

import "./App.css";
import { ItemForm } from "./components/ItemForm";
import { Nav } from "./components/Nav";
import { useGlobalState } from "./context/GlobalContext";

function App() {
  const [state, setState] = useGlobalState();

  const items = state.items;
  const locations = state.locations;

  // const [locations, setLocations] = useState([]);
  // const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/items")
      .then((response) => response.json())
      .then((itemsData) =>
        setState((state) => ({ ...state, items: itemsData }))
      );

    fetch("http://localhost:3333/locations")
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
        <div className="flex flex-col items-center">
          <ItemForm locations={locations} items={items} />
          <Nav></Nav>
        </div>
      </div>
    </main>
  );
}

export default App;

// AIIFE

// (async function (){
//   //body here
// })()
