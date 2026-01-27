import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import api from "../services/api";
import NavBar from "../components/NavBar";

import { useMovieForm } from "@/features/library/hooks/useMovieForm";
import { MovieFields } from "@/features/library/components/MovieFields";
import { movieToFormData } from "@/features/library/utils/movieMappers";

export default function MovieEditForm() {
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
  } = useMovieForm(async (payload, token) => {
    await api.put(`/library/movies/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  // Load existing movie
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await api.get(`/library/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(movieToFormData(data));
      } catch (e) {
        console.error(e);
        setError("Failed to load movie");
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
          Edit Movie
        </h1>

        <form
          className="bk-form p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            await submit();
            navigate(`/library/movie/${id}`);
          }}
        >
          <MovieFields
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
              onClick={() => navigate(`/library/movies/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
