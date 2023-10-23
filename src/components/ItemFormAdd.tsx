import classNames from "classnames";
import { useState, FormEvent, ChangeEvent } from "react";
import { HistoryType } from "../context/GlobalContext";
import { api } from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import { locationsSelector } from "../redux/selectors/locations";
import { addItem } from "../redux/actions/items";
import { addHistory } from "../redux/actions/histories";

export const ItemFormAdd = () => {
  const dispatch = useDispatch();
  const locations = useSelector(locationsSelector);

  // const [state, setState] = useGlobalState();
  // const locations = state.locations;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      sku: HTMLInputElement;
      description: HTMLInputElement;
      brand: HTMLInputElement;
      type: HTMLInputElement;
      quantity: HTMLInputElement;
      date: HTMLInputElement;
      stockInLocationId: ChangeEvent<HTMLSelectElement>;
      reset: () => void;
    };

    const sku = form.sku.value.trim();
    const description = form.description.value.trim();
    const brand = form.brand.value.trim();
    const type = form.type.value.trim();
    const selectedStockInLocationId = Number(form.stockInLocationId);
    const quantity = Number(form.quantity.value);
    const itemLocations = locations.map((location) => ({
      locationId: location.id,
      quantity: selectedStockInLocationId === location.id ? quantity : 0,
    }));
    const date = form.date.value;
    const formattedDate = date
      ? new Date(`${date}T12:00:00`).toISOString()
      : null;

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

    const [createdItem, createdItemError] = await api.post(`/items`, newItem);

    if (createdItemError) {
      console.log("Watch out! ERROR", createdItemError);
      return;
    }

    // setState((state) => ({ ...state, items: [...state.items, createdItem] }));
    dispatch(addItem(createdItem));

    const newHistory = {
      itemId: createdItem.id,
      createdAt: new Date().toISOString(),
      date: formattedDate,
      stockInLocationId: selectedStockInLocationId,
      stockOutLocationId: null,
      quantity,
      type: "purchase",
    };

    const [createdHistory, createdHistoryError] = await api.post<HistoryType>(
      `/histories`,
      newHistory
    );

    if (!createdHistoryError) {
      // setState((state) => ({
      //   ...state,
      //   histories: [...state.histories, createdHistory],
      // }));
      dispatch(addHistory(createdHistory));

    }

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
          max={new Date().toISOString().split("T")[0]}
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
