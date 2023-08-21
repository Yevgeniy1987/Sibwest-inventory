import { useEffect, useState } from "react";

import { InventoryMainTable } from "./components/InventoryMainTable";
import { LocationTable } from "./components/LocationTable";
import { HistoryTable } from "./components/HistoryTable";

import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/items")
      .then((response) => response.json())
      .then((itemsData) => setItems(itemsData));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3333/locations")
      .then((response) => response.json())
      .then((locationsData) => setLocations(locationsData));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3333/histories")
      .then((response) => response.json())
      .then((historiesData) => setHistories(historiesData));
  }, []);

  return (
    <main>
      <div className="container flex flex-col gap-3">
        <h1 className="text-center w-full px-6 py-6 text-8xl font-bold bg-contain">
          Sibwest inventory table
        </h1>

        <div className="">

          <InventoryMainTable items={items} setItems={setItems} />

        </div>
        <div>

          <LocationTable locations={locations} setLocations={setLocations} />
        </div>
        <div>

          <HistoryTable histories={histories} setHistories={setHistories} />

        </div>
      </div>
    </main>
  );
}

export default App;
