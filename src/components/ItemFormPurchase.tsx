import classNames from "classnames";
import { FormEvent, ChangeEvent, useState } from "react";
import { useGlobalState } from "../context/GlobalContext";
import { api } from "../service/api";

export const ItemFormPurchase = () => {
  const [state, setState] = useGlobalState();
  const items = state.items;
  const locations = state.locations;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      item: HTMLInputElement;
      stockInLocationId: ChangeEvent<HTMLSelectElement>;
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
    const selectedStockInLocationId = Number(form.stockInLocationId);
    const quantity = Number(form.quantity.value);
    const date = form.date.value;
    const formattedDate = date
      ? new Date(`${date}T12:00:00`).toISOString()
      : null;
    const itemStockInLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockInLocationId
    );

    item.locations[itemStockInLocationIdx].quantity += quantity;
    item.total += quantity;

    setIsLoading(true);

    const [updatedItem, updatedItemError] = await api.patch(
      `/items/${itemId}`,
      item
    );
    if (updatedItemError) {
      return console.log(updatedItemError);
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
      stockInLocationId: selectedStockInLocationId,
      stockOutLocationId: null,
      quantity,
      type: "purchase",
    };

    const [createdHistory, createdHistoryError] = await api.post(
      `/histories`,
      newHistory
    );
    if (createdHistoryError) {
      console.log("Watch out! ERROR", updatedItemError);
      return;
    }
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
        <label className="font-bold text-start  w-full" htmlFor="item">
          Item
        </label>
        <input
          id="item"
          type="text"
          name="item"
          placeholder="Select item for action"
          list="itemOptions"
          className="border p-1 border-solid border-black rounded w-full text-black"
          required
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
          htmlFor="stockInLocation"
        >
          Stock in location{" "}
        </label>
        <select
          className="border p-1 border-solid border-black rounded w-full text-black"
          id="stockInLocation"
          name="stockInLocationId"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select stock in location
          </option>

          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
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
        <label className="font-bold text-start  w-full" htmlFor="date">
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
          "px-8 py-4 mt-3 bg-green-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white",
          isLoading && "bg-gray-400"
        )}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Purchase"}
      </button>
    </form>
  );
};
