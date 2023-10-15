import classNames from "classnames";
import { ChangeEvent, FormEvent, useState } from "react";
import { ItemType, useGlobalState } from "../context/GlobalContext";
import { api } from "../service/api";

useState;
export const ItemFormDiscarding = () => {
  const [state, setState] = useGlobalState();
  const items = state.items;
  const locations = state.locations;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      item: HTMLInputElement;
      stockOutLocationId: ChangeEvent<HTMLSelectElement>;
      quantity: HTMLInputElement;
      date: HTMLInputElement;
      reset: () => void;
    };

    const [itemSKU] = form.item.value.split(" ");

    const item = items.find((item) => item.sku === itemSKU);

    if (!item) {
      //Guard clause
      console.log(`Item not found with SKU ${itemSKU}`);
      alert("Item not found");
      return;
    }

    const itemId = item.id;
    const selectedStockOutLocationId = Number(form.stockOutLocationId);
    const quantity = Number(form.quantity.value);
    const date = form.date.value;
    const formattedDate = date
      ? new Date(`${date}T12:00:00`).toISOString()
      : null;

    const itemStockOutLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockOutLocationId
    );

    if (item.locations[itemStockOutLocationIdx].quantity - quantity < 0) {
      alert(
        `Not enough items in stock (${item.locations[itemStockOutLocationIdx].quantity})`
      );
      return;
    }

    item.locations[itemStockOutLocationIdx].quantity -= quantity;
    item.total -= quantity;

    setIsLoading(true);

    const [updatedItem, updatedItemError] = await api.patch<ItemType>(
      `/items/${itemId}`,
      item
    );

    if (updatedItemError) {
      //handle error
      return;
    }

    setState((state) => {
      const itemIdx = state.items.findIndex(
        (item) => item.id === updatedItem.id
      );
      items[itemIdx] = updatedItem;

      return { ...state, items: [...items] };
    });

    const newHistory = {
      itemId,
      createdAt: new Date().toISOString(),
      date: formattedDate,
      stockOutLocationId: selectedStockOutLocationId,
      stockInLocationId: null,
      quantity,
      type: "discarding",
    };

    const createdHistory = await fetch(`http://localhost:3333/histories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newHistory),
    }).then((r) => r.json());

    setState((state) => ({
      ...state,
      histories: [...state.histories, createdHistory],
    }));

    form.reset();

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <label htmlFor="item" className="text-start font-bold w-full">
          Item
        </label>
        <input
          required
          id="item"
          type="text"
          name="item"
          placeholder="Select item for action"
          list="itemOptions"
          className="border p-1 border-solid rounded border-black w-full"
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
          htmlFor="stockOutLocation"
          className="text-start font-bold w-full"
        >
          Stock Out location
        </label>
        <select
          id="stockOutLocation"
          name="stockOutLocationId"
          defaultValue=""
          className="border p-1 border-solid rounded border-black w-full"
          required
        >
          <option value="" disabled>
            Select stock Out location
          </option>

          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <label htmlFor="quantity" className="text-start font-bold w-full">
          Quantity
        </label>
        <input
          required
          id="quantity"
          type="number"
          name="quantity"
          placeholder="Qty"
          step="1"
          className="border p-1 border-solid rounded border-black w-full"
        />

        <label htmlFor="selectedDate" className="text-start font-bold w-full">
          Date
        </label>
        <input
          id="selectedDate"
          type="date"
          name="date"
          max={new Date().toISOString().split("T")[0]}
          className="border p-1 border-solid rounded border-black w-full"
        />
      </div>

      <button
        className={classNames(
          "px-8 py-4 mt-3 bg-red-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white",
          isLoading && "bg-gray-400"
        )}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Discard"}
      </button>
    </form>
  );
};
