import { InventoryMainTableRow } from './InventoryMainTableRow';
import { useGlobalState } from '../context/GlobalContext';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { api } from '../service/api';

export function InventoryMainTable() {
  const [state, setState] = useGlobalState();
  const items = state.items;
  const locations = state.locations;

  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    sku: '',
    description: '',
    type: '',
    brand: ''
  });

  useEffect(() => {
    const queryArray = Object.entries(filters);
    const queryStringArray = queryArray.map((array) =>
      array[1] ? `${array.join('=')}&` : ''
    );
    const queryString = queryStringArray.join('');

    setIsLoading(true);

    api
      .get(`/items?${queryString}`)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .then(([itemsData, itemsError]) => {
        if (itemsData) {
          setState((state) => ({ ...state, items: itemsData }));
        }

        if (itemsError) {
          console.log(itemsError);
        }
      })
      .finally(() => setIsLoading(false));
  }, [filters, setState]);

  const handleSKUFilter = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as typeof e.target & { sku: HTMLInputElement };

    const sku = form.sku.value.trim();

    setFilters({ ...filters, sku });
  };

  const handleBrandFilter = async (e) => {
    e.preventDefault();
    const brand = e.target.brand.value.trim();

    setFilters({
      ...filters,
      brand
    });
  };

  const handleTypeFilter = async (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value.trim();

    setFilters({
      ...filters,
      type
    });
  };

  const handleDescriptionFilter = async (e) => {
    e.preventDefault();

    const description = e.target.description.value
      .trim()
      .replaceAll(/\s{2,}/g, ' ')
      .toLowerCase();

    setFilters({
      ...filters,
      description
    });
  };

  return (
    <table className="container w-full ">
      <thead className="border text-xl font-bold capitalize bg-slate-400">
        <tr>
          <th className="border border-solid  border-black p-1">SKU</th>
          <th className="border border-solid  border-black p-1">Description</th>
          <th className="border border-solid  border-black p-1">Brand</th>
          <th className="border border-solid  border-black p-1">Type</th>
          <th className="border border-solid  border-black p-1">Total</th>
          <th className="border border-solid  border-black p-1">Lost</th>
          {locations.map((location) => (
            <th
              className="border border-solid  border-black p-1"
              key={location.id}>
              {location.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="text-black border border-solid border-white p-1 font-medium">
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
          <td className="border border-solid  border-black p-1">
            <form className="flex gap-1" onSubmit={handleDescriptionFilter}>
              <input
                type="search"
                name="description"
                className="text-black"
                placeholder="Filter by description"
              />
              <button type="submit">&#128269;</button>
            </form>
          </td>
          <td className="border border-solid border-black p-1">
            <form className="flex gap-1" onSubmit={handleBrandFilter}>
              <input
                type="search"
                name="brand"
                className="text-black"
                placeholder="Filter by brand"
              />
              <button type="submit">&#128269;</button>
            </form>
          </td>
          <td className="border border-solid border-black p-1">
            <select
              className="flex gap-1 text-black"
              name="stockInLocationId"
              defaultValue=""
              onChange={handleTypeFilter}>
              <option value="">Filter type</option>

              {items.map((item) => (
                <option key={item.id} value={item.type}>
                  {item.type}
                </option>
              ))}
            </select>
          </td>
        </tr>
        {isLoading && (
          <tr>
            <td colSpan={11} className="text-black text-l font-bold py-4">
              Loading...
            </td>
          </tr>
        )}

        {items.map((item) => (
          <InventoryMainTableRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}



// function foo<T>(a: T):T {
//   return a
// }

// const res1 = foo(1)
// const res2 = foo<number>(res1)



// type Event1<T = Element> = {
//   preventDefault: () => void,
//   target: T
// }