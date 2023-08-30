export const ItemFormLost = ({ locations, items, setItems, setHistories }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const [itemSKU] = form.item.value.split(" ");

    const item = items.find((item) => item.sku === itemSKU);
    const itemId = item.id;
    const selectedStockOutLocationId = Number(form.stockOutLocationId.value);
    const quantity = Number(form.quantity.value);

    const itemStockOutLocationIdx = item.locations.findIndex(
      (itemLocation) => itemLocation.locationId === selectedStockOutLocationId
    );

    item.locations[itemStockOutLocationIdx].quantity -= quantity;
    item.total -= quantity;
    item.lost += quantity;

    const updatedItem = await fetch(`http://localhost:3333/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(item),
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
      stockOutLocationId: selectedStockOutLocationId,
      stockInLocationId: null,
      quantity,
      type: "lost",
    };

    const createdHistory = await fetch(`http://localhost:3333/histories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newHistory),
    }).then((r) => r.json());

    setHistories((histories) => [...histories, createdHistory]);

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="item">Item</label>
      <input
        className="bg-indigo-950 border border-white rounded text-white"
        id="item"
        type="text"
        name="item"
        placeholder="Select item for action"
        list="itemOptions"
      />
      <datalist id="itemOptions">
        {items.map((item) => (
          <option
            key={item.id}
            value={`${item.sku} ${item.description} ${item.brand}`}
          ></option>
        ))}
      </datalist>

      <select
        className="border border-white rounded bg-gray-400"
        name="stockOutLocationId"
        defaultValue=""
      >
        <option value="" disabled>
          Select stock Out location
        </option>

        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        type="number"
        name="quantity"
        placeholder="Qty"
        step="1"
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        name="date"
        min="2023-01-01"
        max="2023-12-31"
      />

      <button
        className="h-10 w-28 bg-indigo-950 border border-solid border-white rounded text-white hover:text-black hover:bg-white"
        type="submit"
      >
        Lost
      </button>
    </form>
  );
};
