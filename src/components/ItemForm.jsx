import { useState } from 'react';
import { ItemFormMovement } from './ItemFormMovement';
import { ItemFormPurchase } from './ItemFormPurchase';
import { ItemFormAdd } from './ItemFormAdd';

// "movement | purchase | sale | discarding | lost | add"

const DEFAULT_ACTION_TYPE = 'movement';

export const ItemForm = ({ locations, items, setItems, setHistories }) => {
  const [selectedActionType, setSelectedActionType] =
    useState(DEFAULT_ACTION_TYPE);

  return (
    <div className="flex flex-col gap-3">
      <select
        name="actionType"
        value={selectedActionType}
        onChange={(e) => setSelectedActionType(e.target.value)}>
        <option value="movement">Movement</option>
        <option value="purchase">Purchase</option>
        <option value="sale">Sale</option>
        <option value="discarding">Discarding</option>
        <option value="lost">Lost</option>
        <option value="add">Add</option>
      </select>

      {selectedActionType === 'movement' && (
        <ItemFormMovement
          locations={locations}
          items={items}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}

      {selectedActionType === 'purchase' && (
        <ItemFormPurchase
          locations={locations}
          items={items}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}

      {selectedActionType === 'add' && (
        <ItemFormAdd
          locations={locations}
          setItems={setItems}
          setHistories={setHistories}
        />
      )}
    </div>
  );
};
