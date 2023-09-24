import { useRoute } from "wouter";
import { useGlobalState } from "../context/GlobalContext";
import { useState } from "react";

export const AddLocation = () => {
  const [_, setState] = useGlobalState();

  const route = useRoute("/location/:type");
  console.log(route);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const location = form.location.value.trim();
    const address = form.address.value.trim();

    const newLocation = {
      location,
      address,
    };
    setIsLoading(true);
    const createdLocation = await fetch(`http://localhost:3333/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newLocation),
    }).then((r) => r.json());

    setState((locations) => [...locations, createdLocation]);
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
