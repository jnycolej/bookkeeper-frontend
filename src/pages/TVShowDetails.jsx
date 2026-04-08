// Page to view/edit details of a specific book

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@heroui/accordion";
import axios from "axios";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import api from "../services/api";
import NavBar from "../components/NavBar";
import { formatDate } from "@/utils/date";
import { deleteTVShow } from "../services/tvShowService";
import { Rating } from "@/components/Rating";

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
            console.log(
              "TMDB call auth header:",
              token ? "HAS TOKEN" : "NO TOKEN",
            );
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
    <div className=" bookKeeper-library-background text-stone-100">
      <NavBar />
      <div className="flex mt-10 mx-5 place-content-center gap-2">
        <div className="flex-1 p-2">
          {tvShowImage ? (
            <img
              src={tvShowImage}
              alt={`${tvShow.title} poster`}
              className="rounded"
            />
          ) : (
            <div className="w-[260px] h-[390px] grid place-items-center rounded bg-stone-900/40">
              No poster
            </div>
          )}
        </div>
        <div className="flex-2 max-h-[70vh] my-2 p-2 overflow-auto rounded bg-red-900/60">
          <p className="text-3xl">{tvShow.title}             <span className="ml-2">
                        {tvShow.rating != null ? (
                          <span>
                            {" | "}
                            <Rating ratingNum={Number(tvShow.rating)} />{" "}
                          </span>
                        ) : null}
                      </span></p>

          <div className="p-2">
            <div className="">
              <p className="">
                Created By:{" "}
                {Array.isArray(tvShow.creator)
                  ? tvShow.creator.join(" | ")
                  : tvShow.creator}
              </p>
              <hr />
              <div>{tvShow.rating ? `My Rating: ${tvShow.rating}` : " "}</div>

              <div>
                <p className=" capitalize">
                  <span className="text-lg">Genres</span> :{" "}
                  {Array.isArray(tvShow.genres)
                    ? tvShow.genres.join(" | ")
                    : tvShow.genre}
                </p>
              </div>
              <div>
                <p className=" capitalize">
                  <span className="">Show Runner</span> :{" "}
                  {Array.isArray(tvShow.showRunner)
                    ? tvShow.showRunner.join(" | ")
                    : tvShow.showRunner}
                </p>
              </div>
              <div>
                <p>Based On: {tvShow.basedOn ? tvShow.basedOn : "Original"}</p>
              </div>
              <div>
                <p className="capitalize">
                  <Accordion isCompact>
                    <AccordionItem
                      className="justify-content-left"
                      aria-label="Actor Accordion"
                      title="Actors"
                    >
                      {Array.isArray(tvShow.actors)
                        ? tvShow.actors.join(" | ")
                        : tvShow.actors}
                    </AccordionItem>
                    <AccordionItem
                      className="justify-content-left"
                      aria-label="Writer Accordion"
                      title="Writers"
                    >
                      {Array.isArray(tvShow.writers)
                        ? tvShow.writers.join(" | ")
                        : tvShow.writers}
                    </AccordionItem>
                    <AccordionItem
                      className="justify-content-left"
                      aria-label="Executive Producer Accordion"
                      title="Executive Producer"
                    >
                      {Array.isArray(tvShow.execProducers)
                        ? tvShow.execProducers.join(" | ")
                        : tvShow.execProducers}
                    </AccordionItem>
                    <AccordionItem
                      aria-label="Producers Accordion"
                      title="Producers"
                    >
                      {Array.isArray(tvShow.producers)
                        ? tvShow.producers.join(" | ")
                        : tvShow.producers}
                    </AccordionItem>
                    <AccordionItem
                      aria-label="Cinematography accordion"
                      title="Cinematography"
                    >
                  {Array.isArray(tvShow.cinematography)
                    ? tvShow.cinematography.join(" | ")
                    : tvShow.cinematography}                      
                    </AccordionItem>
                  </Accordion>
                </p>
              </div>
              <div>
                <p>Camera Setup: {tvShow.cameraSetup}</p>
              </div>
              <div>
                <p>Music By: {tvShow.musicBy}</p>
              </div>
              <div>
                <p className="">
                  <span className="">Start Date - End Date</span> :{" "}
                  {(tvShow.startDate).slice(0,10)} <span className="">to</span> {tvShow.endDate ? (tvShow.endDate).slice(0,10) : "Present"}
                </p>
              </div>
              <div>
                <p>Still Running: {tvShow.stillRunning ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="">
                  <span className="">Seasons</span> : {tvShow.seasons}
                </p>
              </div>
              <div>
                <p>Episodes: {tvShow.episodes}</p>
              </div>
              <div>
                <p>Average Episode Runtime: {tvShow.avgRuntime}mins</p>
              </div>
              <div>
                <p className="capitalize">
                  <span className="">Status</span> :{" "}
                  {tvShow.status === "currentlyWatching"
                    ? "Currently Watching"
                    : tvShow.status.charAt(0).toUpperCase() +
                      tvShow.status.slice(1)}
                </p>
              </div>
              <div>
                <p>Network: {tvShow.network}</p>
              </div>
              <div>
                <p className="capitalize">
                  <span className="">Production Companies</span> :{" "}
                  {Array.isArray(tvShow.productionCompanies)
                    ? tvShow.productionCompanies.join(" | ")
                    : tvShow.productionCompanies}
                </p>
              </div>
              <div>
                <p>Language: {tvShow.language}</p>
              </div>
              <div>
                <p>Country: {tvShow.country}</p>
              </div>
              <div>
                <p className="">
                  <span className="">Date Finished</span> :{" "}
                  {tvShow.dateFinished
                    ? formatDate(tvShow.dateFinished)
                    : "Not Finished/Still Watching"}
                </p>
              </div>
              <div>
                <p>Rewatch Count: {tvShow.rewatchCount}</p>
              </div>
              <div>
                <p className="">
                  <span className="">Format</span> : {tvShow.format}
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
