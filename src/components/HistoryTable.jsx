import { useState, useEffect } from "react";
import { HistoryTableRow } from "./HistoryTableRow";

export function HistoryTable({ histories, locations, items, setHistories }) {
  const [filters, setFilters] = useState({
    itemId: "",
    description: "",
    stockInLocationId: "",
    stockOutLocation: "",
    type: "",
  });
  useEffect(() => {
    const queryArray = Object.entries(filters);
    const queryStringArray = queryArray.map((array) =>
      array[1] ? `${array.join("=")}&` : ""
    );
    const queryString = queryStringArray.join("");

    fetch(`http://localhost:3333/histories?${queryString}`)
      .then((response) => response.json())
      .then((historiesData) => setHistories(historiesData));
  }, [filters]);

  const handleSKUFilter = async (e) => {
    e.preventDefault();
    const sku = e.target.sku.value.trim();

    const items = await fetch(`http://localhost:3333/items?sku=${sku}`).then(
      (response) => response.json()
    );

    const item = items[0];

    setFilters({ ...filters, itemId: item?.id || sku });
  };

  const handleActionTypeFilter = async (e) => {
    const actionType = e.target.value
      .trim()
      .replaceAll(/\s{2,}/g, " ")
      .toLowerCase();

    setFilters({
      ...filters,
      type: actionType,
    });
  };

  const handleStockInLocationFilter = async (e) => {
    const stockInLocationId = e.target.value
      .trim()
      .replaceAll(/\s{2,}/g, " ")
      .toLowerCase();

    setFilters({
      ...filters,
      stockInLocationId
    });
  };
  const handleStockOutLocationFilter = async (e) => {
    const stockOutLocationId = e.target.value
      .trim()
      .replaceAll(/\s{2,}/g, " ")
      .toLowerCase();

    setFilters({
      ...filters,
      stockOutLocationId
    });
  };

  return (
    <table className="text-center w-full container">
      <thead className="border border-solid border-black text-xl font-bold capitalize bg-slate-400">
        <tr>
          <th className="border border-solid border-black p-1">Created Date</th>
          <th className="border border-solid  border-black p-1">Date</th>
          <th className="border border-solid  border-black p-1">SKU</th>
          <th className="border border-solid  border-black p-1">
            Item Description
          </th>
          <th className="border border-solid  border-black p-1">Action Type</th>
          <th className="border border-solid  border-black p-1">
            Stock In Location
          </th>
          <th className="border border-solid  border-black p-1">
            Stock Out Location
          </th>
          <th className="border border-solid border-black first-line:p-1">
            Quantity
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-black border border-solid border-white p-1 font-medium">
          <td className="border border-solid  border-black p-1"></td>
          <td className="border border-solid  border-black p-1"></td>
          <td className="border border-solid  border-black p-1">
            <form className="flex gap-1" onSubmit={handleSKUFilter}>
              <input
                type="search"
                name="sku"
                className="text-black"
                placeholder="Filter by sku"
              />
              <button type="submit">&#128269;</button>
            </form>
          </td>
          <td className="border border-solid  border-black p-1"></td>
          <td className="border border-solid border-black p-1">
            <select
              className="text-black"
              name="actionType"
              onChange={handleActionTypeFilter}
              defaultValue=""
            >
              <option value="">Filter Action type</option>
              <option value="movement">Movement</option>
              <option value="purchase">Purchase</option>
              <option value="sale">Sale</option>
              <option value="discarding">Discarding</option>
              <option value="lost">Lost</option>
            </select>
          </td>
          <td className="border border-solid border-black p-1">
            <select
              className="flex gap-1 text-black"
              name="stockInLocationId"
              defaultValue=""
              onChange={handleStockInLocationFilter}
            >
              <option value="">Filter stock in location</option>

              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </td>
          <td className="border border-solid border-black p-1">
            <select
              name="stockOutLocationId"
              defaultValue=""
              className="flex gap-1 text-black"
              onChange={handleStockOutLocationFilter}
            >
              <option value="">Filter stock out location</option>

              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </td>
          <td className="border border-solid border-black p-1"></td>
        </tr>
        {histories.map((history) => (
          <HistoryTableRow
            key={history.id}
            history={history}
            locations={locations}
            items={items}
          />
        ))}
      </tbody>
    </table>
  );
}
