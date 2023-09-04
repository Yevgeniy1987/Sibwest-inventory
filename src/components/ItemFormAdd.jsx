export const ItemFormAdd = ({ locations, setItems, setHistories }) => {
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
const date = form.date.value.trim();
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
      date: createdItem.date,
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
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="sku" className="text-start font-bold w-1/4">SKU</label>
        <input id="sku" type="text" name="sku" placeholder="Enter SKU" className="border border-solid rounded border-black w-1/4"/>
      
      <label htmlFor="description" className="text-start font-bold w-1/4">Description</label>
        <input id="description" type="text" name="description" placeholder="Enter Description" className="border border-solid rounded border-black w-1/4"/>
     
      <label htmlFor="brand" className="text-start font-bold w-1/4">Brand</label>
        <input id="brand" type="text" name="brand" placeholder="Enter Brand" className="border border-solid rounded border-black w-1/4"/>
     
      <label htmlFor="type" className="text-start font-bold w-1/4">Item type</label>
        <input id="type" type="text" name="type" placeholder="Enter Type" className="border border-solid rounded border-black w-1/4"/>
      
      <label htmlFor="date" className="text-start font-bold w-1/4">Date</label>
        <input id="date" type="date" name="date" min="2023-01-01" max="2023-12-31" className="border border-solid rounded border-black w-1/4"/>
     
      <select name="stockInLocationId" defaultValue="">
        <option value="" disabled>
          Select stock in location
        </option>

        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <label htmlFor="quantity" className="text-start font-bold w-1/4">Quantity</label>
        <input id="quantity" type="number" name="quantity" placeholder="Qty" step="1" />
      

      <button
        className="h-10 w-28 bg-indigo-950 border border-solid border-white rounded text-white hover:text-black hover:bg-white"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
