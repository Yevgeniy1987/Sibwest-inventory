import { useEffect, useState } from "react";
import { Switch, Route, Link } from "wouter";
import classNames from "classnames";

import "./App.css";

import { InventoryMainTable } from "./components/InventoryMainTable";
import { HistoryTable } from "./components/HistoryTable";
import { LocationTable } from "./components/LocationTable";

import { ItemForm } from "./components/ItemForm";
// import { Nav } from "./components/Nav";
import { useGlobalState } from "./context/GlobalContext";

function App() {
  const [state, setState] = useGlobalState();

  const [selectedType, setSelectedType] = useState("history");

  const isMain = selectedType === "main";
  const isHistory = selectedType === "history";
  const isLocation = selectedType === "location";
  const isAction = selectedType === "action";
  

  // const items = state.items;
  // const locations = state.locations;

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

        <nav className="mb-3 flex justify-center gap-3">
          <Link
            className={classNames(
              "px-8 py-4 mt-3 border border-solid border-black rounded text-black hover:bg-gray-300",
              isMain && "bg-amber-200"
            )}
            value="main"
            onClick={() => {
              setSelectedType("main");
            }}
            href="/main"
          >
            Main
          </Link>
          <Link
            className={classNames(
              "px-8 py-4 mt-3 border border-solid border-black rounded text-black hover:bg-gray-300",
              isHistory && "bg-amber-200"
            )}
            value="history"
            onClick={() => {
              setSelectedType("history");
            }}
            href="/history"
          >
            History
          </Link>
          <Link
            className={classNames(
              "px-8 py-4 mt-3 border border-solid border-black rounded text-black hover:bg-gray-300",
              isLocation && "bg-amber-200"
            )}
            value="location"
            onClick={() => {
              setSelectedType("location");
            }}
            href="/location"
          >
            Location
          </Link>
          <Link
             className={classNames(
              "px-8 py-4 mt-3 border border-solid border-black rounded text-black hover:bg-gray-300",
              isAction && "bg-amber-200"
            )}
            value="action"
            onClick={() => {
              setSelectedType("action");
            }}
            href="/action"
          >
            Action
          </Link>
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
          <Route>
            <ItemForm path="/action" />
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
