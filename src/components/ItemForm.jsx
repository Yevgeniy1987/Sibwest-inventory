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

    const description = form.itemDescription.value;
    const sku = form.itemSku.value;
    const brand = form.itemBrand.value;
    const type = form.itemType.value;
    const newItemQuantity = form.itemQuantity.value;

    const newItem = {
      id: window.crypto.randomUUID(),
      description,
      sku,
      brand,
      type,
      newItemQuantity,
    };
    setItems((items) => [...items, newItem]);

    const [itemSKU] = form.item.value.split(" ");
    const [locationId] = form.item.value.split(" ");
    const [itemTotalQuantity] = form.item.value.split(" ");

    const selectedLocationId = locations.find(
      (location) => location.id === locationId
    );

    const item = items.find((item) => item.sku === itemSKU);
    const itemId = item.id;
    const selectedStockInLocationId = Number(form.stockInLocationId.value);
    const quantity = Number(form.quantity.value);

    const totalQuantity = items.find(
      (item) => item.total === itemTotalQuantity
    );
    console.log(totalQuantity);
    const selectedItemTotalQuantity = Number(form.quantity.value);

    const itemStockOutLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockOutLocationId
    );
    const itemStockInLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockInLocationId
    );
    console.log(itemStockInLocationIdx);
    const purchasedQuantityIdx = item.findIndex(
      (itemTotal) => itemTotal.id === itemId
    );
    console.log(purchasedQuantityIdx);
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
        <label htmlFor="itemId">Select item for action</label>
        <input
          id="itemId"
          type="text"
          name="item"
          placeholder="Item"
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
        <label htmlFor="stockOutLocationId">
          Select stock Out Location for action
        </label>
        <input
          id="stockOutLocationId"
          type="text"
          name="stockOutLocationId"
          placeholder="Stock Out Location"
          list="itemLocations"
          value={selectedStockOutLocationId}
          disabled=""
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
        <label htmlFor="stockInLocationId">
          Select stock in Location for action
        </label>
        <input
          id="stockInLocationId"
          type="text"
          name="stockInLocationId"
          placeholder="Stock in Location"
          list="itemInLocations"
          disabled={!selectedStockOutLocationId}
        />
        <datalist id="itemInLocations">
          {locations.map((location) =>
            selectedStockOutLocationId !== location.id ? (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ) : null
          )}
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

        <h2 className="text-2xl font-bold">Purchase</h2>

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

        <label htmlFor="purchaseStockInLocationId">
          Select stock in Location for action
        </label>
        <input
          id="purchaseStockInLocationId"
          type="text"
          name="stockInLocationId"
          placeholder="Stock in Location"
          list="itemInLocations"
        />
        <datalist id="itemInLocations">
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </datalist>

        <input type="number" name="quantity" placeholder="Qty" step="1" />

        <h2 className="text-2xl font-bold">Add</h2>
        <input type="number" name="itemSku" placeholder="Enter item SKU" />
        <input
          type="text"
          name="itemDescription"
          placeholder="Enter item description"
        />
        <input type="text" name="itemBrand" placeholder="Enter item brand" />
        <input type="text" name="itemType" placeholder="Enter item type" />
        <input
          type="number"
          name="itemQuantity"
          placeholder="Enter item quantity"
          step="1"
        />
        <h2 className="text-2xl font-bold">Sale</h2>

        <label htmlFor="saleItemId">Select item for action</label>
        <input
          id="saleItemId"
          type="text"
          name="item"
          placeholder="Item"
          list="saleItemOptions"
        />
        <datalist id="saleItemOptions">
          {items.map((item) => (
            <option
              key={item.id}
              value={`${item.sku} ${item.description} ${item.brand}`}
            ></option>
          ))}
        </datalist>
        <label htmlFor="saleStockOutLocationId">
          Select stock Out Location for action
        </label>
        <input
          id="saleStockOutLocationId"
          type="text"
          name="stockOutLocationId"
          placeholder="Stock Out Location"
          list="itemLocations"
          value={selectedStockOutLocationId}
          
          onChange={(e) =>
            setSelectedStockOutLocationId(Number(e.target.value))
          }
        />
        <datalist id="itemLocations">
          {locations.map((location) => (
            <option key={location.id} value={`${location.name}`}></option>
          ))}
        </datalist>

        <input type="number" name="quantity" placeholder="Qty" step="1" />

        <button type="submit">Action</button>
      </form>
    </>
  );
};
