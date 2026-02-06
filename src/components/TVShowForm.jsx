import { addTVShow } from "../services/tvShowService";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

import { useTVShowForm } from "@/features/library/hooks/useTVShowForm";
import { TVShowFields } from "@/features/library/components/TVShowFields";

export default function TVShowForm() {
  const navigate = useNavigate();

  const { formData, setField, handleChange, isValid, submit } =
    useTVShowForm(addTVShow);

  return (
    <div>
      <NavBar />

      <div className="mx-auto bookKeeper-library-background w-full max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-center text-4xl font-semibold">
          Add New TV Show
        </h1>

        <form
          className="bk-form p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await submit();
              navigate("/library");
            } catch (err) {
              console.error("Add tv show failed:", err);
              alert("TV Show failed to save. Check console/network.");
            }
          }}
        >
          <TVShowFields
            formData={formData}
            setField={setField}
            handleChange={handleChange}
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-red-900 p-3 m-1 font-medium rounded"
              disabled={!isValid}
            >
              Add TV Show
            </button>

            {/* <button
              type="button"
              className="bg-red-900/40 p-3 m-1 font-medium rounded"
              disabled={!isValid}
              onClick={async () => {
                await submit({ reset: true }); // add & reset
              }}
            >
              Add & Add Another
            </button> */}

            <button
              type="button"
              className="border-2 border-red-600 p-2 px-4 font-bold bg-stone-50/50 text-red-900 rounded"
              onClick={() => navigate("/library")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
