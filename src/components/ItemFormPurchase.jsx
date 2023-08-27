export const ItemFormPurchase = ({
  locations,
  items,
  setItems,
  setHistories
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const [itemSKU] = form.item.value.split(' ');

    const item = items.find((item) => item.sku === itemSKU);
    const itemId = item.id;
    const selectedStockInLocationId = Number(form.stockInLocationId.value);
    const quantity = Number(form.quantity.value);

    const itemStockInLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockInLocationId
    );

    item.locations[itemStockInLocationIdx].quantity += quantity;
    item.total += quantity;

    const updatedItem = await fetch(`http://localhost:3333/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(item)
    }).then((r) => r.json());

    setItems((items) => {
      const itemIdx = items.findIndex((item) => item.id === updatedItem.id);
      items[itemIdx] = updatedItem;

      return [...items];
    });

    const newHistory = {
      itemId,
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
    }).then((r) => r.json());

    setHistories((histories) => [...histories, createdHistory]);

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            value={`${item.sku} ${item.description} ${item.brand}`}></option>
        ))}
      </datalist>

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

      <button className="h-10 w-28 bg-indigo-950 border rounded text-white hover:text-black hover:bg-white" type="submit">Purchase</button>
    </form>
  );
};