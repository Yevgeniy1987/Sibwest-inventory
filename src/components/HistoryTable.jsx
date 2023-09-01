import { useState, useEffect } from "react";
import { HistoryTableRow } from "./HistoryTableRow";

export function HistoryTable({ histories, locations, items, setHistories }) {
  const [filters, setFilters] = useState({
    sku: "",
  });
  useEffect(() => {
    (async function () {
      let queryString = "";

      for (const filterKey in filters) {
        const filterValue = filters[filterKey];

        if (filterKey === "sku" && filterValue) {
          const items = await fetch(
            `http://localhost:3333/items?sku=${filterValue}`
          )
            .then((response) => response.json())
            .then((historiesData) => setHistories(historiesData));

          if (items.length > 0) {
            const item = items[0] 
            queryString += `itemId=${item.Id}`;
          }

          // queryString += `sku_like=${filterValue}&`;
        }
      }
      //  const queryArray = Object.entries(filters)
      //  const queryStringArray = queryArray.map(array=>`${array.join('=')}&`)
      //  const queryString = queryStringArray.join('')

      fetch(`http://localhost:3333/histories?${queryString}`)
        .then((response) => response.json())
        .then((historiesData) => setHistories(historiesData));
    })();
  }, [filters]);

  const handleSKUFilter = (e) => {
    e.preventDefault();
    const sku = e.target.sku.value.trim();
    setFilters({ ...filters, sku });
  };

  return (
    <table className="text-center w-full">
      <thead className="border text-xl font-bold capitalize bg-slate-400">
        <tr>
          <th className="border border-solid border-white p-1">Created Date</th>
          <th className="border border-solid border-white p-1">Date</th>
          <th className="border border-solid border-white p-1">SKU</th>
          <th className="border border-solid border-white p-1">
            Item Description
          </th>
          <th className="border border-solid border-white p-1">Action Type</th>
          <th className="border border-solid border-white p-1">
            Stock In Location
          </th>
          <th className="border border-solid border-white p-1">
            Stock Out Location
          </th>
          <th className="border border-solid border-white p-1">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-white border border-solid border-white p-1 font-medium">
          <td className="border border-solid border-white p-1"></td>
          <td className="border border-solid border-white p-1"></td>
          <td className="border border-solid border-white p-1">
            <form className="flex gap-1" onSubmit={handleSKUFilter}>
              <input
                type="text"
                name="sku"
                className="text-black"
                placeholder="Filter by sku"
              />
              <button type="submit">&#128269;</button>
            </form>
          </td>
          <td className="border border-solid border-white p-1"></td>
          <td className="border border-solid border-white p-1"></td>
          <td className="border border-solid border-white p-1"></td>
          <td className="border border-solid border-white p-1"></td>
          <td className="border border-solid border-white p-1"></td>
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
