import { useState } from "react";
import { ItemFormMovement } from "./ItemFormMovement";
import { ItemFormPurchase } from "./ItemFormPurchase";
import { ItemFormAdd } from "./ItemFormAdd";
import { ItemFormSale } from "./ItemFormSale";
import { ItemFormDiscarding } from "./ItemFormDiscarding";
import { ItemFormLost } from "./ItemFormLost";

// "movement | purchase | sale | discarding | lost | add"

const DEFAULT_ACTION_TYPE = "chooseAction";

export const ItemForm = ({ locations, items, setItems, setHistories }) => {
  const [selectedActionType, setSelectedActionType] =
    useState(DEFAULT_ACTION_TYPE);

  return (
    <div className="container flex flex-col gap-3">
      <select className="w-1/5 rounded border border-solid border-black"
        name="actionType"
        onChange={(e) => setSelectedActionType(e.target.value)}
      >
        <option className="w-1/2" value="chooseAction">Choose action</option>
        <option value="movement">Movement</option>
        <option value="purchase">Purchase</option>
        <option value="sale">Sale</option>
        <option value="discarding">Discarding</option>
        <option value="lost">Lost</option>
        <option value="add">Add</option>
      </select>

      {selectedActionType === "chooseAction" && ""}

      {selectedActionType === "movement" && (
        <ItemFormMovement
          locations={locations}
          items={items}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}

      {selectedActionType === "purchase" && (
        <ItemFormPurchase
          locations={locations}
          items={items}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}

      {selectedActionType === "add" && (
        <ItemFormAdd
          locations={locations}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}

      {selectedActionType === "sale" && (
        <ItemFormSale
          items={items}
          locations={locations}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}

      {selectedActionType === "discarding" && (
        <ItemFormDiscarding
          items={items}
          locations={locations}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}

      {selectedActionType === "lost" && (
        <ItemFormLost
          items={items}
          locations={locations}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}
    </div>
  );
};
