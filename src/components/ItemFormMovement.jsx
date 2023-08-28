import { useState } from "react";

export const ItemFormMovement = ({
  locations,
  items,
  setItems,
  setHistories,
}) => {
  const [selectedStockOutLocationId, setSelectedStockOutLocationId] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const [itemSKU] = form.item.value.split(" ");

    const item = items.find((item) => item.sku === itemSKU);
    const itemId = item.id;
    const selectedStockInLocationId = Number(form.stockInLocationId.value);
    const quantity = Number(form.quantity.value);

    const itemStockOutLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockOutLocationId
    );
    const itemStockInLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockInLocationId
    );

    item.locations[itemStockOutLocationIdx].quantity -= quantity;

    if (item.locations[itemStockOutLocationIdx].quantity < 0) {
      alert(
        `Not enough items in stock (${item.locations[itemStockOutLocationIdx].quantity})`
      );
      return;
    }

    item.locations[itemStockInLocationIdx].quantity += quantity;

    fetch(`http://localhost:3333/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((updatedItem) =>
        setItems((items) => {
          const itemIdx = items.findIndex((item) => item.id === updatedItem.id);
          items[itemIdx] = updatedItem;

          return [...items];
        })
      );

    const newHistory = {
      itemId,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
      stockInLocationId: selectedStockInLocationId,
      stockOutLocationId: selectedStockOutLocationId,
      quantity,
      type: "movement",
    };

    fetch(`http://localhost:3333/histories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newHistory),
    })
      .then((response) => response.json())
      .then((createdHistory) =>
        setHistories((histories) => [...histories, createdHistory])
      );

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex justify-between gap-3">
        <input
          className="border bg-blue-300 white rounded"
          type="text"
          name="item"
          placeholder="Select item for action"
          list="itemOptions"
        />
        <datalist id="itemOptions">
          {items.map((item) => (
            <option
              key={item.id}
              value={`${item.sku} ${item.description} ${item.brand}`}
            ></option>
          ))}
        </datalist>

        <select
          name="stockOutLocationId"
          value={selectedStockOutLocationId}
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

        <select
          name="stockInLocationId"
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

        <input type="number" name="quantity" placeholder="Qty" step="1" />
      </div>

      <button className="h-10 w-28 bg-indigo-950 border border-solid border-white rounded text-white hover:text-black hover:bg-white" type="submit">
        Move
      </button>
    </form>
  );
};
