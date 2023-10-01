import { useState } from "react";
import { ItemFormMovement } from "./ItemFormMovement";
import { ItemFormPurchase } from "./ItemFormPurchase";
import { ItemFormAdd } from "./ItemFormAdd";
import { ItemFormSale } from "./ItemFormSale";
import { ItemFormDiscarding } from "./ItemFormDiscarding";
import { ItemFormLost } from "./ItemFormLost";
// import { Modal } from "./Modal";

// "movement | purchase | sale | discarding | lost | add"

const DEFAULT_ACTION_TYPE = "movement";

export const ItemForm = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedActionType, setSelectedActionType] =
    useState(DEFAULT_ACTION_TYPE);

  return (
    <>
      {/* <div className="flex justify-start">
        <button
          className="px-8 py-4 mt-3 bg-green-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white"
          onClick={() => setIsModalOpen(true)}
        >
          Action
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> */}
        <div className="flex justify-center">
          <div className="items-center flex flex-col gap-3 w-[500px]">
            <select
              className="w-full p-1 rounded border border-solid border-black text-center"
              name="actionType"
              onChange={(e) => setSelectedActionType(e.target.value)}
            >
              <option value="movement">Movement</option>
              <option value="purchase">Purchase</option>
              <option value="sale">Sale</option>
              <option value="discarding">Discarding</option>
              <option value="lost">Lost</option>
              <option value="add">Add</option>
            </select>

            {selectedActionType === "movement" && <ItemFormMovement />}

            {selectedActionType === "purchase" && <ItemFormPurchase />}

            {selectedActionType === "add" && <ItemFormAdd />}

            {selectedActionType === "sale" && <ItemFormSale />}

            {selectedActionType === "discarding" && <ItemFormDiscarding />}

            {selectedActionType === "lost" && <ItemFormLost />}
          </div>
        </div>
      {/* </Modal> */}
    </>
  );
};
