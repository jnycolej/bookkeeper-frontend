import { addVideoGame } from "@/services/gameService";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

import { useVideoGameForm } from "@/features/library/hooks/useVideoGameForm";
import { VideoGameFields } from "@/features/library/components/VideoGameFields";

export default function VideoGameForm() {
  const navigate = useNavigate();

  const { formData, setField, handleChange, isValid, submit } =
    useVideoGameForm(addVideoGame);

  return (
    <div>
      <NavBar />

      <div className="mx-auto bookKeeper-library-background w-full max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-center text-4xl font-semibold">
          Add New Game
        </h1>

        <form
          className="bk-form p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await submit();
              navigate("/library");
            } catch (err) {
              console.error("Add video game failed:", err);
              console.error("Server said:", err?.response?.data);
              console.error("Status:", err?.response?.status);
              alert("Video game failed to save. Check console/network.");
            }
          }}
        >
          <VideoGameFields
            formData={formData}
            setField={setField}
            handleChange={handleChange}
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-red-900 p-3 m-1 font-medium rounded"
            >
              Add Game
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
