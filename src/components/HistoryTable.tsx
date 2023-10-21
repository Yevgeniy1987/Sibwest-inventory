import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { HistoryTableRow } from "./HistoryTableRow";
import { useGlobalState } from "../context/GlobalContext";
import { api } from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import { setHistories } from "../redux/actions/histories";
import { historiesSelector } from "../redux/selectors/histories";

export function HistoryTable() {
  const dispatch = useDispatch();
  const histories = useSelector(historiesSelector);

  const [state, setState] = useGlobalState();

  // const histories = state.histories;
  const locations = state.locations;

  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    itemId: "",
    description: "",
    stockInLocationId: "",
    stockOutLocationId: "",
    type: "",
  });

  useEffect(() => {
    const queryArray = Object.entries(filters);
    const queryStringArray = queryArray.map((array) =>
      array[1] ? `${array.join("=")}&` : ""
    );
    const queryString = queryStringArray.join("");

    setIsLoading(true);

    api
      .get(`/histories?${queryString}`)
      .then(([historiesData, historiesError]) => {
        if (historiesData) {
          setState((state) => ({ ...state, histories: historiesData }));
          dispatch(setHistories(historiesData));
        }

        if (historiesError) {
          console.log(historiesError);
        }
      })
      .finally(() => setIsLoading(false));
  }, [filters]);

  const handleSKUFilter = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      sku: HTMLInputElement;
    };
    const sku = form.sku.value.trim();

    const [items, itemsError] = await api.get(`/items?sku=${sku}`);

    if (!itemsError) {
      const item = items[0];

      setFilters({ ...filters, itemId: item?.id || sku });
    }
  };

  const handleActionTypeFilter = async (e: ChangeEvent<HTMLSelectElement>) => {
    const actionType = e.target.value.trim().toLowerCase();

    setFilters({
      ...filters,
      type: actionType,
    });
  };

  const handleStockInLocationFilter = async (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const stockInLocationId = e.target.value.trim().toLowerCase();

    setFilters({
      ...filters,
      stockInLocationId,
    });
  };

  const handleStockOutLocationFilter = async (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const stockOutLocationId = e.target.value
      .trim()
      .replaceAll(/\s{2,}/g, "")
      .toLowerCase();

    setFilters({
      ...filters,
      stockOutLocationId,
    });
  };

  return (
    <table className="w-full overflow-auto h-[600px] block relative">
      <thead className="border border-solid border-black text-xl font-bold capitalize bg-slate-400 sticky top-0">
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
        {isLoading && (
          <tr>
            <td colSpan={8} className="text-black text-l font-bold py-4">
              Loading...
            </td>
          </tr>
        )}

        {!isLoading &&
          histories.map((history) => (
            <HistoryTableRow key={history.id} history={history} />
          ))}
      </tbody>
    </table>
  );
}
