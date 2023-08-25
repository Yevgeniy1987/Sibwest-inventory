import { useState } from "react";

// "movement | purchase | sale | discarding | lost | add"

const DEFAULT_ACTION_TYPE = "movement";

export const ItemForm = ({ locations, items, setItems, setHistories }) => {
  const [selectedActionType, setSelectedActionType] =
    useState(DEFAULT_ACTION_TYPE);
  const [selectedStockOutLocationId, setSelectedStockOutLocationId] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const [itemSKU] = form.item.value.split(" ");
    const [itemTotalQuantity] = form.item.value.split(" ");

    const item = items.find((item) => item.sku === itemSKU);
    const itemId = item.id;
    const selectedStockInLocationId = Number(form.stockInLocationId.value);
    const quantity = Number(form.quantity.value);
    const totalQuantity = items.find(
      (item) => item.total === itemTotalQuantity
    );
    const selectedItemTotalQuantity = Number(form.quantity.value);

    const itemStockOutLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockOutLocationId
    );
    const itemStockInLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockInLocationId
    );

    const purchasedQuantityIdx = item.findIndex(
      (itemTotal) => itemTotal.id === itemId
    );
    item.locations[itemStockOutLocationIdx].quantity -= quantity;

    if (item.locations[itemStockOutLocationIdx].quantity <= 0) {
      alert(
        `Not enough items in stock (${item.locations[itemStockOutLocationIdx].quantity})`
      );
      return;
    }
    item.total[purchasedQuantityIdx].quantity += selectedItemTotalQuantity;
    console.log(selectedItemTotalQuantity);
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
      type: selectedActionType,
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
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">Movement</h2>
        <select
          name="actionType"
          value={selectedActionType}
          onChange={(e) => setSelectedActionType(e.target.value)}
        >
          <option value="movement">Movement</option>
          <option value="purchase">Purchase</option>
          <option value="sale">Sale</option>
          <option value="discarding">Discarding</option>
          <option value="lost">Lost</option>
          <option value="add">Add</option>
        </select>

        <input
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

        <input
          type="text"
          name="stockOutLocationId"
          placeholder="Select stock Out Location for action"
          list="itemLocations"
          onChange={(e) =>
            setSelectedStockOutLocationId(Number(e.target.value))
          }
        />
        <datalist id="itemLocations">
          {locations.map((location) => (
            <option key={location.id} value={`${location.name}`}></option>
          ))}
        </datalist>

        {/* <select
        name="stockOutLocationId"
        value={selectedStockOutLocationId}
        onChange={(e) => setSelectedStockOutLocationId(Number(e.target.value))}
      >
        <option value="" disabled>
          Select stock out location
        </option>

        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select> */}

        <input
          type="text"
          name="stockInLocationId"
          placeholder="Select stock in Location for action"
          list="itemInLocations"
        />
        <datalist id="itemInLocations">
          {locations.map((location) => (
            <option key={location.id} value={`${location.name}`}></option>
          ))}
        </datalist>

        {/* <select
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
      </select> */}

        <input type="number" name="quantity" placeholder="Qty" step="1" />

        <h2 className="text-2xl font-bold">Add</h2>
        <p>inputs should be here...</p>

        {/* <button type="submit">Action</button> */}
      </form>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">Purchase</h2>
        <select
          name="actionType"
          value={selectedActionType}
          onChange={(e) => setSelectedActionType(e.target.value)}
        >
          <option value="movement">Movement</option>
          <option value="purchase">Purchase</option>
          <option value="sale">Sale</option>
          <option value="discarding">Discarding</option>
          <option value="lost">Lost</option>
          <option value="add">Add</option>
        </select>

        <input
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
        {/* <select
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
      </select> */}

        <input type="number" name="quantity" placeholder="Qty" step="1" />

        <h2 className="text-2xl font-bold">Add</h2>
        <p>inputs should be here...</p>

        <button type="submit">Action</button>
      </form>
    </>
  );
};
