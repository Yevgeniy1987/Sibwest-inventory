import classNames from "classnames";
import { useState } from "react";

useState;
export const ItemFormDiscarding = ({
  locations,
  items,
  setItems,
  setHistories,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const [itemSKU] = form.item.value.split(" ");

    const item = items.find((item) => item.sku === itemSKU);
    const itemId = item.id;
    const selectedStockOutLocationId = Number(form.stockOutLocationId.value);
    const quantity = Number(form.quantity.value);
    const date = form.selectedDate.value;

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
      date: date,
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

    setHistories((histories) => [...histories, createdHistory]);

    form.reset();

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="item" className="text-start font-bold w-1/4">
        Item
      </label>
      <input
        required
        id="item"
        type="text"
        name="item"
        placeholder="Select item for action"
        list="itemOptions"
        className="border border-solid rounded border-black w-1/4"
      />

      <datalist id="itemOptions">
        {items.map((item) => (
          <option
            key={item.id}
            value={`${item.sku} ${item.description} ${item.brand}`}
          ></option>
        ))}
      </datalist>
      <label htmlFor="stockOutLocation" className="text-start font-bold w-1/4">
        Stock Out location
      </label>
      <select
        id="stockOutLocation"
        name="stockOutLocationId"
        defaultValue=""
        className="border border-solid rounded border-black w-1/4"
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
      <label htmlFor="quantity" className="text-start font-bold w-1/4">
        Quantity
      </label>
      <input
        required
        id="quantity"
        type="number"
        name="quantity"
        placeholder="Qty"
        step="1"
        className="border border-solid rounded border-black w-1/4"
      />

      <label htmlFor="selectedDate" className="text-start font-bold w-1/4">
        Date
      </label>
      <input
        id="selectedDate"
        type="date"
        name="selectedDate"
        min="2023-01-01"
        max="2023-12-31"
        className="border border-solid rounded border-black w-1/4"
      />

      <button
        className={classNames(
          "h-10 w-28 bg-red-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white",
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
