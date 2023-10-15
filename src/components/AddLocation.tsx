import { useState, FormEvent } from "react";
import classNames from "classnames";

import { useGlobalState } from "../context/GlobalContext";
import { api } from "../service/api";

export const AddLocation = () => {
  const [state, setState] = useGlobalState();
  const items = state.items;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      location: HTMLInputElement;
      address: HTMLInputElement;
      reset: () => void;
    };

    const location = form.location.value.trim();
    const address = form.address.value.trim();

    const newLocation = {
      name: location,
      address,
    };

    setIsLoading(true);

    const [createdLocation, createdLocationError] = await api.post(
      `/locations`,
      newLocation
    );

    if (!createdLocationError) {
      setState((state) => ({
        ...state,
        locations: [...state.locations, createdLocation],
      }));
    }

    const createdLocationId = createdLocation.id;

    const updatedItemPromises = items.map((item) =>
      api.patch(`/items/${item.id}`, {
        locations: [
          ...item.locations,
          { locationId: createdLocationId, quantity: 0 },
        ],
      })
    );

    const updatedItemResponses = await Promise.all(updatedItemPromises);

    updatedItemResponses.forEach((response: any[]) => {
      const [, error] = response;
      if (error) {
        console.log(response[1]);
      }
    });

    form.reset();
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <label htmlFor="location" className="text-start font-bold w-full">
          Location
        </label>
        <input
          required
          id="location"
          type="text"
          name="location"
          placeholder="Enter location name"
          className="border p-1 border-solid rounded border-black w-full"
        />

        <label htmlFor="address" className="text-start font-bold w-full">
          Address
        </label>
        <input
          required
          id="address"
          type="text"
          name="address"
          placeholder="Enter location address"
          className="border p-1 border-solid rounded border-black w-full"
        />
      </div>

      <button
        className={classNames(
          "px-8 py-4 mt-3 bg-green-600 border border-solid border-white rounded text-white hover:text-black hover:bg-white",
          isLoading && "bg-gray-400"
        )}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Add"}
      </button>
    </form>
  );
};
