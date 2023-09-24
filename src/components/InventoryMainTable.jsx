
import { InventoryMainTableRow } from './InventoryMainTableRow';
import { useGlobalState } from '../context/GlobalContext';


export function InventoryMainTable() {
const [state] = useGlobalState();
const items = state.items;
const locations = state.locations;

  // const [isLoading, setIsLoading] = useState(false);

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
            <th className="border border-solid  border-black p-1" key={location.id}>
              {location.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      
        {items.map((item) => (
          <InventoryMainTableRow
            key={item.id}
            item={item}
            
          />
        ))}
      </tbody>
    </table>
  );
}
