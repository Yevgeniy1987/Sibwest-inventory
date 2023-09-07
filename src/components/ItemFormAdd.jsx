import classNames from "classnames";
import { useState } from "react";

useState;
export const ItemFormAdd = ({ locations, setItems, setHistories }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const sku = form.sku.value.trim();
    const description = form.description.value.trim();
    const brand = form.brand.value.trim();
    const type = form.type.value.trim();
    const selectedStockInLocationId = Number(form.stockInLocationId.value);
    const quantity = Number(form.quantity.value);
    const itemLocations = locations.map((location) => ({
      locationId: location.id,
      quantity: selectedStockInLocationId === location.id ? quantity : 0,
    }));
    const date = form.date.value;
    const formattedDate = date ? new Date(`${date}T12:00:00`).toISOString() : null;;
    const newItem = {
      sku,
      description,
      brand,
      type,
      date,
      total: quantity,
      locations: itemLocations,
      lost: 0,
    };
    setIsLoading(true);
    const createdItem = await fetch(`http://localhost:3333/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newItem),
    }).then((r) => r.json());

    setItems((items) => [...items, createdItem]);

    const newHistory = {
      itemId: createdItem.id,
      createdAt: new Date().toISOString(),
      date: formattedDate,
      stockInLocationId: selectedStockInLocationId,
      stockOutLocationId: null,
      quantity,
      type: "purchase",
    };

    const createdHistory = await fetch(`http://localhost:3333/histories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newHistory),
    }).then((response) => response.json());

    setHistories((histories) => [...histories, createdHistory]);

    form.reset();

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <label htmlFor="sku" className="text-start font-bold w-full">
          SKU
        </label>
        <input
          required
          id="sku"
          type="text"
          name="sku"
          placeholder="Enter SKU"
          className="border p-1 border-solid rounded border-black w-full"
        />

        <label htmlFor="description" className="text-start font-bold w-full">
          Description
        </label>
        <input
          required
          id="description"
          type="text"
          name="description"
          placeholder="Enter Description"
          className="border p-1 border-solid rounded border-black w-full"
        />

        <label htmlFor="brand" className="text-start font-bold w-full">
          Brand
        </label>
        <input
          id="brand"
          type="text"
          name="brand"
          placeholder="Enter Brand"
          className="border p-1 border-solid rounded border-black w-full"
        />

        <label htmlFor="type" className="text-start font-bold w-full">
          Item type
        </label>
        <input
          id="type"
          type="text"
          name="type"
          placeholder="Enter Type"
          className="border p-1 border-solid rounded border-black w-full"
        />

        <label htmlFor="date" className="text-start font-bold w-full">
          Date
        </label>
        <input
          id="date"
          type="date"
          name="date"
          max={new Date().toISOString().split('T')[0]}
          className="border p-1 border-solid rounded border-black w-full"
        />
        <label
          htmlFor="stockInLocation"
          className="text-start font-bold w-full"
        >
          Stock in location
        </label>
        <select
          required
          id="stockInLocation"
          name="stockInLocationId"
          defaultValue=""
          className="border p-1 border-solid rounded border-black w-full"
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
      </div>

      <button
        className={classNames(
          "px-8 py-4 mt-3 bg-green-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white",
          isLoading && "bg-gray-400"
        )}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Add"}
      </button>
    </form>
  );
};
