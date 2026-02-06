import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import api from "@/services/api";
import NavBar from "@/components/NavBar";

import { useVideoGameForm } from "@/features/library/hooks/useVideoGameForm";
import { VideoGameFields } from "@/features/library/components/VideoGameFields";
import { videoGameToFormData } from "@/features/library/utils/videoGameMappers";

export default function VideoGameEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
const [saving, setSaving] = useState(false);
const [saveError, setSaveError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { formData, setFormData, setField, handleChange, isValid, submit } =
    useVideoGameForm(async (payload, token) => {
      const res = await api.put(`/library/videogames/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    });

  // Load existing tv show
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await api.get(`/library/videogames/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(videoGameToFormData(data));
      } catch (e) {
        console.error(e);
        setError("Failed to load video game");
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
          Edit Video Game
        </h1>

        <form
          className="bk-form p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            setSaveError(null);
            setSaving(true);
            try {
              await submit();
              navigate(`/library/videogames/${id}`);
            } catch (err) {
              console.error(err);
              setSaveError("Failed to save changes");
            } finally {
              setSaving(false);
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
              className="bk-btn-primary"
              disabled={!isValid}
            >
              Save Changes
            </button>

            <button
              type="button"
              className="border-2 p-2 rounded bg-stone-100 text-red-600"
              onClick={() => navigate(`/library/videogames/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
