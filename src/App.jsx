import { useEffect, useState } from "react";

import { InventoryMainTable } from "./components/InventoryMainTable";
import { LocationTable } from "./components/LocationTable";
import { HistoryTable } from "./components/HistoryTable";

import "./App.css";
import { ItemForm } from "./components/ItemForm";
import { Nav } from "./components/Nav";

function App() {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/items")
      .then((response) => response.json())
      .then((itemsData) => setItems(itemsData));

    fetch("http://localhost:3333/locations")
      .then((response) => response.json())
      .then((locationsData) => setLocations(locationsData));
  }, []);

  return (
    <main>
      <div className="container flex flex-col gap-3">
        <h1 className="text-center w-full px-6 py-6 text-4xl font-bold bg-contain text-orange-300">
          Sibwest inventory table
        </h1>
        <div className="flex flex-col items-center">
          <ItemForm
            locations={locations}
            items={items}
            setItems={setItems}
            setHistories={setHistories}
          />
          <Nav
            items={items}
            locations={locations}
            setItems={setItems}
            histories={histories}
            setHistories={setHistories}
            setLocations={setLocations}
          ></Nav>
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
