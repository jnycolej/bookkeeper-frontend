// Page to view/edit details of a specific book

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import api from "../services/api";
import NavBar from "../components/NavBar";
import { formatDate } from "@/utils/date";
import { deleteTVShow } from "../services/tvShowService";

const POSTER_SIZE = "w500";
const TMDB_IMG_BASE = "https://image.tmdb.org/t/p";

const TVShowDetails = () => {
  const { id } = useParams();

  const { getAccessTokenSilently } = useAuth0();

  const [tvShow, settvShow] = useState(null);
  const [tvShowImage, settvShowImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigate();

  const handleDelete = () => {};

  useEffect(() => {
    //Fetch book details from the backend API
    setLoading(true);
    const fetchTVShowDetails = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await api.get(`/library/tvShows/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        settvShow(data);
        // ✅ TMDB poster
        try {
          let posterPath = null;

          if (data.tmdbId) {
            const tmdbRes = await api.get(`/tmdb/tv/${data.tmdbId}`, {
              // headers: { Authorization: `Bearer ${token}` },
            });
            posterPath = tmdbRes.data?.poster_path;
          } else {
            // fallback: search by title
            console.log("TMDB call auth header:", token ? "HAS TOKEN" : "NO TOKEN");
            const searchRes = await api.get(
              `/tmdb/search/tv?q=${encodeURIComponent(data.title)}`,
            );

            const first = searchRes.data?.results?.[0];
            posterPath = first?.poster_path || null;
          }

          settvShowImage(
            posterPath ? `${TMDB_IMG_BASE}/${POSTER_SIZE}${posterPath}` : null,
          );
        } catch (e) {
          console.error("TMDB poster fetch failed", e);
          settvShowImage(null);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tvShow details");
      } finally {
        setLoading(false);
      }
    };
    fetchTVShowDetails();
  }, [id, getAccessTokenSilently]);

  if (loading) {
    return <div className="text-center text-danger mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  if (!tvShow) {
    return (
      <div className="text-centeer text-danger mt-5">tvShow not found</div>
    );
  }

  return (
    <div className="h-screen bookKeeper-library-background text-stone-100">
      <NavBar />
      <div className="flex mt-10  place-content-center gap-2">
        <div className="flex-none p-2 mr-5 shadow-lg/20 shadow-stone-950">
          {tvShowImage ? (
            <img
              src={tvShowImage}
              alt={`${tvShow.title} poster`}
              className="w-[260px] rounded"
            />
          ) : (
            <div className="w-[260px] h-[390px] grid place-items-center rounded bg-stone-900/40">
              No poster
            </div>
          )}
        </div>
        <div className="flex-intial p-2 rounded bg-red-900/60">
          <p className="text-3xl">{tvShow.title}</p>

          <div className="p-2">
            <div className="">
              <p className="font-bold">
                {Array.isArray(tvShow.director)
                  ? tvShow.director.join(" | ")
                  : tvShow.director}
              </p>
              <hr />
              <div>
                <p className="text-base/10 font-medium capitalize">
                  <span className="text-lg">Genres</span> :{" "}
                  {Array.isArray(tvShow.genres)
                    ? tvShow.genres.join(" | ")
                    : tvShow.genre}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Release Date</span> :{" "}
                  {tvShow.releaseDate}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Seasons</span> : {tvShow.seasons}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium capitalize">
                  <span className="text-lg">Status</span> :{" "}
                  {tvShow.status === "currentlyWatching"
                    ? "Currently Watching"
                    : tvShow.status.charAt(0).toUpperCase() +
                      tvShow.status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Date Finished</span> :{" "}
                  {formatDate(tvShow.dateFinished)}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Format</span> : {tvShow.format}
                </p>
              </div>
              <div></div>
              <div className="flex p-2 gap-4">
                <Button
                  className="text-xl"
                  onClick={() =>
                    navigation(`/library/tvShows/${tvShow._id}/edit`)
                  }
                >
                  Edit Show
                </Button>

                <button
                  type="button"
                  className="outline-stone-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTVShow();
                  }}
                >
                  Delete Show
                </button>

                <Button
                  className="text-xl"
                  onClick={() => navigation("/library")}
                >
                  Return
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default tvShowDetails;
export default withAuthenticationRequired(TVShowDetails, {
  onRedirecting: () => <div>Loading...</div>,
});
