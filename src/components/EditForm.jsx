import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import api from "../services/api";
import NavBar from "../components/NavBar";

import { useBookForm } from "@/features/library/hooks/useBookForm";
import { BookFields } from "@/features/library/components/BookFields";
import { bookToFormData } from "@/features/library/utils/bookMappers";

export default function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    formData,
    setFormData,
    setField,
    handleChange,
    isValid,
    submit,
  } = useBookForm(async (payload, token) => {
    await api.put(`/books/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  // Load existing book
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await api.get(`/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(bookToFormData(data));
      } catch (e) {
        console.error(e);
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, getAccessTokenSilently, setFormData]);

  if (loading) return <div className="text-center mt-5">Loading…</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div>
      <NavBar />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-center text-4xl font-semibold text-dark">
          Edit Book
        </h1>

        <form
          className="bk-form p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            await submit();
            navigate(`/books/${id}`);
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
              className="bk-btn-primary"
              disabled={!isValid}
            >
              Save Changes
            </button>

            <button
              type="button"
              className="border-2 p-2 rounded bg-stone-100 text-red-600"
              onClick={() => navigate(`/books/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
