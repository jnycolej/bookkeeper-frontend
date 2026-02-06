// Page to view/edit details of a specific book

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"

import axios from "axios";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import api from "../services/api";
import NavBar from "../components/NavBar";
import { formatDate } from "@/utils/date";
import { deleteMovie } from "../services/movieService";

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
        // if (!data.asin) {
        //   setBookImage(
        //     `https://covers.openlibrary.org/b/isbn/${
        //       data.isbn13 || data.isbn10
        //     }-M.jpg`,
        //   );
        // } else {
        //   setBookImage(`https://images.amazon.com/images/P/${data.asin}.jpg`);
        // }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch video game details");
      } finally {
        setLoading(false);
      }
    };
    fetchVideoGameDetails();
  }, [id, getAccessTokenSilently]);

  if (loading) {
    return <div className="text-center text-danger mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  if (!videoGame) {
    return <div className="text-centeer text-danger mt-5">Video game not found</div>;
  }

  return (
    <div className="h-screen bookKeeper-library-background text-stone-100">
      <NavBar />
      <div className="flex mt-10  place-content-center gap-2">
        <div className="flex-none p-2 mr-5 shadow-lg/20 shadow-stone-950">
              <img
                src={videoGameImage}
                alt="Video Game Cover"
                
              ></img>
        </div>
        <div className="flex-intial p-2 rounded bg-red-900/60">
          <p className="text-3xl">
            {videoGame.title} - <span className="font-light text-xl">{videoGame.series}{" "}
            {videoGame.seriesNum ? `# ${videoGame.seriesNum}` : ""}</span>
          </p>

          <div className="p-2">
            <div className="">
              <p className="font-bold">
                {Array.isArray(videoGame.director)
                  ? videoGame.director.join(" | ")
                  : videoGame.director}
              </p>
              <hr />
              <div>
                <p className="text-base/10 font-medium capitalize"><span className="text-lg">Genres</span> : {Array.isArray(videoGame.genres)
                    ? videoGame.genres.join(" | ")
                    : videoGame.genre}
                </p>
              </div>
              <div><p className="text-base/10 font-medium"><span className="text-lg">Release Year</span> : {videoGame.releaseYear}</p></div>
              <div><p className="text-base/10 font-medium"><span className="text-lg">Duration</span> : {videoGame.duration} hrs</p></div>
              <div>
                <p className="text-base/10 font-medium capitalize"><span className="text-lg">Status</span> : {videoGame.status}</p>
              </div>
              <div>
                <p className="text-base/10 font-medium"><span className="text-lg">Date Finished</span> : {formatDate(videoGame.dateFinished)}</p>
              </div>
              <div>
                <p className="text-base/10 font-medium"><span className="text-lg">Format</span> : {videoGame.format}</p>
              </div>
              <div>
                <p className="text-base/10 font-medium"><span className="text-lg">Page Count</span> : {videoGame.pageCount}</p>
              </div>
              <div className="flex p-2 gap-4">
                <Button
                  className="text-xl"
                  onClick={() => navigation(`library/videogames/${videoGame._id}/edit`)}
                >
                  Edit Movie
                </Button>
                <Button className="text-xl" onClick={() => navigation("/library")}>
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
