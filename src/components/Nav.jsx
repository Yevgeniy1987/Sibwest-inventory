import { useState } from "react";
import { InventoryMainTable } from "./InventoryMainTable";
import { HistoryTable } from "./HistoryTable";
import { LocationTable } from "./LocationTable";
import classNames from "classnames";

export const Nav = () => {
  const [selectedType, setSelectedType] = useState("history");

  const isMain = selectedType === "main";
  const isHistory = selectedType === "history";
  const isLocation = selectedType === "location";

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
              setSelectedType("main");
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
              setSelectedType("history");
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
              setSelectedType("location");
            }}
          >
            Location Table
          </button>
        </div>
      </nav>
      {isMain && (
        <div className="">
          <h2 className="text-center  px-6 py-6 text-3xl font-bold text-grey-300">
            Main table
          </h2>
          <InventoryMainTable />
        </div>
      )}
      {isHistory && (
        <div>
          <h2 className="text-center  px-6 py-6 text-3xl font-bold text-grey-300">
            History table
          </h2>
          <HistoryTable />
        </div>
      )}
      {isLocation && (
        <div>
          <h2 className="text-center  px-6 py-6 text-3xl font-bold text-grey-300">
            Location table
          </h2>
          <LocationTable />
        </div>
      )}
    </div>
  );
};
