import classNames from "classnames";
import { ChangeEvent, FormEvent, useState } from "react";
import { useGlobalState } from "../context/GlobalContext";

export const ItemFormMovement = () => {
const [state, setState] = useGlobalState();
const items = state.items;
const locations = state.locations;

  const [isLoading, setIsLoading] = useState(false);

  const [selectedStockOutLocationId, setSelectedStockOutLocationId] =
    useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      item: HTMLInputElement;
      stockOutLocationId: ChangeEvent<HTMLSelectElement>;
      stockInLocationId: ChangeEvent<HTMLSelectElement>;
      quantity: HTMLInputElement;
      date: HTMLInputElement;
      reset: () => void,
    };

    const [itemSKU] = form.item.value.split(" ");

    const item = items.find((item) => item.sku === itemSKU);
    const itemId = item.id;
    const selectedStockInLocationId = Number(form.stockInLocationId.value);
    const quantity = Number(form.quantity.value);
    const date = form.date.value;
    const formattedDate = date
      ? new Date(`${date}T12:00:00`).toISOString()
      : null;

    const itemStockOutLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockOutLocationId
    );
    const itemStockInLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockInLocationId
    );

    if (item.locations[itemStockOutLocationIdx].quantity - quantity < 0) {
      alert(
        `Not enough items in stock (${item.locations[itemStockOutLocationIdx].quantity})`
      );
      return;
    }
    item.locations[itemStockOutLocationIdx].quantity -= quantity;
    item.locations[itemStockInLocationIdx].quantity += quantity;

    setIsLoading(true);

    await fetch(`http://localhost:3333/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((updatedItem) =>
        setState((items) => {
          const itemIdx = items.findIndex((item) => item.id === updatedItem.id);
          items[itemIdx] = updatedItem;

          return [...items];
        })
      );

    const newHistory = {
      itemId,
      createdAt: new Date().toISOString(),
      date: formattedDate,
      stockInLocationId: selectedStockInLocationId,
      stockOutLocationId: selectedStockOutLocationId,
      quantity,
      type: "movement",
    };

    await fetch(`http://localhost:3333/histories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newHistory),
    })
      .then((response) => response.json())
      .then((createdHistory) =>
        setState((state) => ({
          ...state,
          histories: [...state.histories, createdHistory],
        }))
      );

    form.reset();

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <label htmlFor="item" className="font-bold text-start  w-full">
          Item
        </label>
        <input
          required
          id="item"
          type="text"
          name="item"
          placeholder="Select item for action"
          list="itemOptions"
          className="border p-1 border-solid border-black rounded w-full text-black"
        />
        <datalist id="itemOptions">
          {items.map((item) => (
            <option
              key={item.id}
              value={`${item.sku} ${item.description} ${item.brand}`}
            ></option>
          ))}
        </datalist>
        <label
          className="font-bold text-start  w-full"
          htmlFor="stockOutLocation"
        >
          Stock out location
        </label>
        <select
          required
          id="stockOutLocation"
          name="stockOutLocationId"
          value={selectedStockOutLocationId}
          className="border p-1 border-solid border-black rounded w-full"
          onChange={(e) =>
            setSelectedStockOutLocationId(Number(e.target.value))
          }
        >
          <option value="" disabled>
            Select stock out location
          </option>

          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <label
          className="border font-bold text-start  w-full"
          htmlFor="stockInLocation"
        >
          Stock in location
        </label>
        <select
          required
          id="stockInLocation"
          name="stockInLocationId"
          className="border p-1 text-start border-solid border-black rounded w-full"
          defaultValue=""
          disabled={!selectedStockOutLocationId}
        >
          <option value="" disabled>
            Select stock in location
          </option>

          {locations.map((location) =>
            selectedStockOutLocationId !== location.id ? (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ) : null
          )}
        </select>
        <label className="font-bold text-start  w-full" htmlFor="quantity">
          Quantity
        </label>
        <input
          required
          id="quantity"
          type="number"
          name="quantity"
          placeholder="Qty"
          step="1"
          className="border p-1 border-solid border-black rounded w-full text-black"
        />
        <label className="font-bold text-start w-full" htmlFor="date">
          Date
        </label>
        <input
          id="date"
          type="date"
          name="date"
          max={new Date().toISOString().split("T")[0]}
          className="border p-1 border-solid border-black rounded w-full text-black"
        />
      </div>

      <button
        className={classNames(
          "px-8 py-4 mt-3 bg-amber-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white",
          isLoading && "bg-gray-400"
        )}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Move"}
      </button>
    </form>
  );
};