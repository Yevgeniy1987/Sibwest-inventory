import classNames from "classnames";
import { useState } from "react";

export const ItemFormSale = ({ locations, items, setItems, setHistories }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const [itemSKU] = form.item.value.split(" ");

    const item = items.find((item) => item.sku === itemSKU);
    const itemId = item.id;
    const selectedStockOutLocationId = Number(form.stockOutLocationId.value);
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

    const updatedItem = await fetch(`http://localhost:3333/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(item),
    }).then((r) => r.json());

    setItems((items) => {
      const itemIdx = items.findIndex((item) => item.id === updatedItem.id);
      items[itemIdx] = updatedItem;

      return [...items];
    });

    const newHistory = {
      itemId,
      createdAt: new Date().toISOString(),
      date: formattedDate,
      stockOutLocationId: selectedStockOutLocationId,
      stockInLocationId: null,
      quantity,
      type: "sale",
    };

    const createdHistory = await fetch(`http://localhost:3333/histories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newHistory),
    }).then((r) => r.json());

    setHistories((histories) => [...histories, createdHistory]);

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
          htmlFor="stockOutLocation"
        >
          Stock Out location
        </label>
        <select
          id="stockOutLocationId"
          name="stockOutLocation"
          defaultValue=""
          className="border p-1 border-solid border-black rounded w-full text-black"
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
        <label className="font-bold text-start  w-full" htmlFor="quantity">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          placeholder="Qty"
          step="1"
          className="border p-1 border-solid border-black rounded w-full text-black"
          required
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
          "px-8 py-4 mt-3 bg-amber-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white",
          isLoading && "bg-gray-400"
        )}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sale"}
      </button>
    </form>
  );
};
