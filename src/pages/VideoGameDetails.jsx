// Page to view/edit details of a specific book

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import api from "../services/api";
import NavBar from "../components/NavBar";
import { formatDate } from "@/utils/date";
import { deleteVideoGame } from "@/services/gameService";
import { Rating } from "@/components/Rating";

const VideoGameDetails = () => {
  const { id } = useParams();

  const { getAccessTokenSilently } = useAuth0();

  const [videoGame, setVideoGame] = useState(null);
  const [videoGameImage, setVideoGameImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigate();

  const handleDelete = () => {};

  useEffect(() => {
    //Fetch video game details from the backend API
    setLoading(true);
    const fetchVideoGameDetails = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await api.get(`/library/videogames/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setVideoGame(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch video game details");
      } finally {
        setLoading(false);
      }
    };
    fetchVideoGameDetails();
  }, [id, getAccessTokenSilently]);

  useEffect(() => {
    if (!videoGame?.title) return;

    const fetchCover = async () => {
      try {
        const token = await getAccessTokenSilently();

        const res = await api.get(
          `/igdb/games/search?q=${encodeURIComponent(videoGame.title)}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const first = res.data?.results?.[0];
        setVideoGameImage(first?.coverUrl || null);
      } catch (err) {
        console.error(err);
        setVideoGameImage(null);
      }
    };

    fetchCover();
  }, [videoGame?.title, getAccessTokenSilently]);

  if (loading) {
    return <div className="text-center text-danger mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  if (!videoGame) {
    return (
      <div className="text-centeer text-danger mt-5">Video game not found</div>
    );
  }

  return (
    <div className="bookKeeper-library-background text-stone-100">
      <NavBar />
      <div className="flex mt-10 p-5 place-content-center gap-2">
        <div className="flex-none p-2 mr-5 shadow-lg/20 shadow-stone-950">
          <img src={videoGameImage} alt="Video Game Cover"></img>
        </div>
        <div className="flex-intial p-2 rounded bg-red-900/60">
          <p className="text-3xl">
            {videoGame.title} -{" "}
            <span className="font-light text-xl">
              {videoGame.series}{" "}
              {videoGame.seriesNum ? `# ${videoGame.seriesNum}` : ""}
            </span>
                        <span className="ml-2">
                          {videoGame.rating != null ? (
                            <span>
                              {" | "}
                              <Rating ratingNum={Number(videoGame.rating)} />{" "}
                            </span>
                          ) : null}
                        </span>
          </p>

          <div className="p-2">
            <div className="">
              <p className="">
                {" "}
                Developer:{" "}
                {Array.isArray(videoGame.developer)
                  ? videoGame.developer.join(" | ")
                  : videoGame.developer}
              </p>
              <hr />
              <div>
                <div>
                  {videoGame.rating ? `My Rating: ${videoGame.rating}` : " "}
                </div>

                <p className="text-base/10 font-medium capitalize">
                  <span className="text-lg">Genres</span> :{" "}
                  {Array.isArray(videoGame.genres)
                    ? videoGame.genres.join(" | ")
                    : videoGame.genre}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Release Year</span> :{" "}
                  {videoGame.releaseYear}
                </p>
              </div>
              <div>
                Publisher:{" "}
                {Array.isArray(videoGame.publisher)
                  ? videoGame.publisher.join(" | ")
                  : videoGame.publisher}
              </div>
              <div>
                Designers:{" "}
                {Array.isArray(videoGame.designer)
                  ? videoGame.designer.join(" | ")
                  : videoGame.designer}
              </div>
              <div>
                Programmers:{" "}
                {Array.isArray(videoGame.programmers)
                  ? videoGame.programmers.join(" | ")
                  : videoGame.programmers}
              </div>

              <div>
                Artist:{" "}
                {Array.isArray(videoGame.artist)
                  ? videoGame.artist.join(" | ")
                  : videoGame.artist}
              </div>
              <div>
                Writers:{" "}
                {Array.isArray(videoGame.writers)
                  ? videoGame.writers.join(" | ")
                  : videoGame.writers}
              </div>
              <div>
                Composer:{" "}
                {Array.isArray(videoGame.composer)
                  ? videoGame.composer.join(" | ")
                  : videoGame.composer}
              </div>
              <div>
                <p>Engine: {videoGame.engine} </p>
              </div>
              <div>
                Platforms:{" "}
                {Array.isArray(videoGame.platforms)
                  ? videoGame.platforms.join(" | ")
                  : videoGame.platforms}
              </div>
              <div>
                Actors:{" "}
                {Array.isArray(videoGame.actors)
                  ? videoGame.actors.join(" | ")
                  : videoGame.actors}
              </div>
              <div>
                <p>
                  {" "}
                  <div>
                    Country:{" "}
                    {Array.isArray(videoGame.country)
                      ? videoGame.country.join(" | ")
                      : videoGame.country}
                  </div>
                </p>
              </div>
              <div>
                <p>
                  Mode:{" "}
                  {Array.isArray(videoGame.mode)
                    ? videoGame.mode.join(" | ")
                    : videoGame.mode}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Duration</span> :{" "}
                  {videoGame.duration} hrs
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium capitalize">
                  <span className="text-lg">Status</span> : {videoGame.status}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Date Started</span> :{" "}
                  {formatDate(videoGame.dateStarted)}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Date Finished</span> :{" "}
                  {videoGame.dateFinished ? formatDate(videoGame.dateFinished): "Still Playing/Not Started"}
                </p>
              </div>
              <div>
                <p>Replay Count: {videoGame.replayCount}</p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Format</span> : {videoGame.format}
                </p>
              </div>
              <div>
                <p className="text-base/10 font-medium">
                  <span className="text-lg">Page Count</span> :{" "}
                  {videoGame.pageCount}
                </p>
              </div>
              <div className="flex p-2 gap-4">
                <Button
                  className="text-xl"
                  onClick={() =>
                    navigation(`/library/videogames/${videoGame._id}/edit`)
                  }
                >
                  Edit Game
                </Button>

                <button
                  type="button"
                  className="outline-stone-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteVideoGame();
                  }}
                >
                  Delete Game
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

// export default VideoGameDetails;
export default withAuthenticationRequired(VideoGameDetails, {
  onRedirecting: () => <div>Loading...</div>,
});
