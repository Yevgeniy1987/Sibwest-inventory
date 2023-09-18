import { useState } from "react";
import { InventoryMainTable } from "./InventoryMainTable";
import { HistoryTable } from "./HistoryTable";
import { LocationTable } from "./LocationTable";
import classNames from "classnames";

export const Nav = ({
  items,
  locations,

  setItems,
  setLocations,
}) => {
  const [isActive, setIsActive] = useState("history");

  const isMain = isActive === "main";
  const isHistory = isActive === "history";
  const isLocation = isActive === "location";

  return (
    <div>
      <nav>
        <div className="flex gap-8 justify-center">
          <button
            className={classNames(
              "px-8 py-4 mt-3 border border-solid border-black rounded text-black hover:bg-gray-300",
              isMain && "bg-amber-200"
            )}
            value="main"
            onClick={() => {
              setIsActive("main");
            }}
          >
            Main Table
          </button>
          <button
            className={classNames(
              "px-8 py-4 mt-3 border border-solid border-black rounded text-black hover:bg-gray-300",
              isHistory && "bg-amber-200"
            )}
            value="history"
            onClick={() => {
              setIsActive("history");
            }}
          >
            History Table
          </button>
          <button
            className={classNames(
              "px-8 py-4 mt-3 border border-solid border-black rounded text-black hover:bg-gray-300",
              isLocation && "bg-amber-200"
            )}
            value="location"
            onClick={() => {
              setIsActive("location");
            }}
          >
            Location Table
          </button>
        </div>
      </nav>
      {isActive === "main" && (
        <div className="">
          <h2 className="text-center  px-6 py-6 text-3xl font-bold text-grey-300">
            Main table
          </h2>
          <InventoryMainTable
            
          />
        </div>
      )}
      {isActive === "history" && (
        <div>
          <h2 className="text-center  px-6 py-6 text-3xl font-bold text-grey-300">
            History table
          </h2>
          <HistoryTable
            items={items}
           
            setItems={setItems}
            locations={locations}
           
          />
        </div>
      )}
      {isActive === "location" && (
        <div>
          <h2 className="text-center  px-6 py-6 text-3xl font-bold text-grey-300">
            Location table
          </h2>
          <LocationTable locations={locations} setLocations={setLocations} />
        </div>
      )}
    </div>
  );
};
