import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import api from "@/services/api";
import NavBar from "@/components/NavBar";

import { useTVShowForm } from "@/features/library/hooks/useTVShowForm";
import { TVShowFields } from "@/features/library/components/TVShowFields";
import { tvShowToFormData } from "@/features/library/utils/tvShowMappers";

export default function TVShowEditForm() {
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
  } = useTVShowForm(async (payload, token) => {
    await api.put(`/library/tvshows/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  // Load existing tv show
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await api.get(`/library/tvshows/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(tvShowToFormData(data));
      } catch (e) {
        console.error(e);
        setError("Failed to load tv show");
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

      <div className="mx-auto w-full max-w-6xl px-4 py-6 bookKeeper-library-background">
        <h1 className="mb-6 text-center text-4xl font-semibold text-dark">
          Edit TV Show
        </h1>

        <form
          className="bk-form p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            await submit();
            navigate(`/library/tvshow/${id}`);
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
              className="bk-btn-primary"
              disabled={!isValid}
            >
              Save Changes
            </button>

            <button
              type="button"
              className="border-2 p-2 rounded bg-stone-100 text-red-600"
              onClick={() => navigate(`/library/tvshows/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
