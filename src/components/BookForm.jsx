import { addBook } from "../services/bookService";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

import { useBookForm } from "@/features/library/hooks/useBookForm";
import { BookFields } from "@/features/library/components/BookFields";

export default function BookForm() {
  const navigate = useNavigate();

  const { formData, setField, handleChange, isValid, submit } =
    useBookForm(addBook);

  return (
    <div>
      <NavBar />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-center text-4xl font-semibold text-dark">
          Add New Book
        </h1>

        <form
          className="bk-form p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            await submit();          // add
            navigate("/home");       // go home after add
          }}
        >
          <BookFields
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
              Add Book
            </button>

            <button
              type="button"
              className="bg-red-900/40 p-3 m-1 font-medium rounded"
              disabled={!isValid}
              onClick={async () => {
                await submit({ reset: true }); // add & reset
              }}
            >
              Add & Add Another
            </button>

            <button
              type="button"
              className="border-2 border-red-600 p-2 px-4 font-bold bg-stone-50/50 text-red-900 rounded"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
