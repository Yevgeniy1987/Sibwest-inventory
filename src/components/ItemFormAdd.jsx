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
      quantity: selectedStockInLocationId === location.id ? quantity : 0
    }));

    const newItem = {
      sku,
      description,
      brand,
      type,
      total: quantity,
      locations: itemLocations,
      lost: 0
    };

    const createdItem = await fetch(`http://localhost:3333/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(newItem)
    }).then((r) => r.json());

    setItems((items) => [...items, createdItem]);

    const newHistory = {
      itemId: createdItem.id,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
      stockInLocationId: selectedStockInLocationId,
      stockOutLocationId: null,
      quantity,
      type: 'purchase'
    };

    const createdHistory = await fetch(`http://localhost:3333/histories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(newHistory)
    }).then((response) => response.json());

    setHistories((histories) => [...histories, createdHistory]);

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="text" name="sku" placeholder="Enter SKU" />
      <input type="text" name="description" placeholder="Enter Description" />
      <input type="text" name="brand" placeholder="Enter Brand" />
      <input type="text" name="type" placeholder="Enter Type" />

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

      <input type="number" name="quantity" placeholder="Qty" step="1" />

      <button type="submit">Add</button>
    </form>
  );
};
