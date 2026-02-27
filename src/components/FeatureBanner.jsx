import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getBookCounts, getBooks } from "@/services/bookService";
import { getVideoGames } from "@/services/gameService";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/services/api";
import { Ticker } from "./Ticker";
import { getMovies } from "@/services/movieService";
import { getTVShows } from "@/services/tvShowService";

const FeatureBanner = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);

  const [tvShows, setTVShows] = useState([]);
  const [featuredTVShows, setFeaturedTVShows] = useState([]);

  const [videoGames, setVideoGames] = useState([]);
  const [featuredVideoGames, setFeaturedVideoGames] = useState([]);

  const navigate = useNavigate();

  const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w342"; // or w500

  const tmdbPosterUrl = (posterPath) =>
    posterPath ? `${TMDB_IMG_BASE}${POSTER_SIZE}${posterPath}` : null;

  useEffect(() => {
    const fetchBooks = async () => {
      const token = await getAccessTokenSilently();
      const data = await getBooks(token);

      const withCovers = data.map((book) => {
        const coverUrl = book.asin
          ? `https://images.amazon.com/images/P/${book.asin}.jpg`
          : `https://covers.openlibrary.org/b/isbn/${
              book.isbn13 || book.isbn10
            }-M.jpg`;
        return { ...book, coverUrl };
      });
      setBooks(withCovers);
    };

    const fetchMovies = async () => {
      const token = await getAccessTokenSilently();
      const movieData = await getMovies(token);

      const withPosters = await Promise.all(
        movieData.map(async (m) => {
          try {
            let posterPath = null;

            if (m.tmdbId) {
              const res = await api.get(`/tmdb/movie/${m.tmdbId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              posterPath = res.data?.poster_path ?? null;
            } else {
              const searchRes = await api.get(
                `/tmdb/search/movie?q=${encodeURIComponent(m.title)}`,
                { headers: { Authorization: `Bearer ${token}` } },
              );
              posterPath = searchRes.data?.results?.[0]?.poster_path ?? null;
            }

            return { ...m, posterUrl: tmdbPosterUrl(posterPath) };
          } catch (e) {
            console.error("TMDB movie poster fetch failed for", m.title, e);
            return { ...m, posterUrl: null };
          }
        }),
      );

      setMovies(withPosters);
    };

    const fetchTVShows = async () => {
      const token = await getAccessTokenSilently();
      const tvShowData = await getTVShows(token); // array

      const withPosters = await Promise.all(
        tvShowData.map(async (show) => {
          try {
            let posterPath = null;

            if (show.tmdbId) {
              const tmdbRes = await api.get(`/tmdb/tv/${show.tmdbId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              posterPath = tmdbRes.data?.poster_path ?? null;
            } else {
              const searchRes = await api.get(
                `/tmdb/search/tv?q=${encodeURIComponent(show.title)}`,
                { headers: { Authorization: `Bearer ${token}` } },
              );
              posterPath = searchRes.data?.results?.[0]?.poster_path ?? null;
            }

            return { ...show, posterUrl: tmdbPosterUrl(posterPath) };
          } catch (e) {
            console.error("TMDB TV poster fetch failed for", show.title, e);
            return { ...show, posterUrl: null };
          }
        }),
      );

      setTVShows(withPosters);
    };

    const igdbPosterUrl = (url) => {
      if (!url) return null;
      const full = url.startsWith("//") ? `https:${url}` : url;
      // upgrade thumb -> cover_big or t_cover_big, depending on your data
      return full.replace("t_thumb", "t_cover_big");
    };

    const fetchVideoGames = async () => {
      const token = await getAccessTokenSilently();
      const videoGameData = await getVideoGames(token);

      const withCovers = await Promise.all(
        videoGameData.map(async (g) => {
          try {
            const res = await api.get(
              `/igdb/games/search?q=${encodeURIComponent(g.title)}`,
              { headers: { Authorization: `Bearer ${token}` } },
            );

            const first = res.data?.results?.[0];
            return { ...g, posterUrl: first?.coverUrl || null };
          } catch (e) {
            console.error("IGDB cover fetch failed for", g.title, e);
            return { ...g, posterUrl: null };
          }
        }),
      );

      setVideoGames(withCovers);
    };
    fetchBooks();
    fetchMovies();
    fetchTVShows();
    fetchVideoGames();
  }, [getAccessTokenSilently]);

  // derive featured subset whenever books load
  useEffect(() => {
    if (!books.length) return;
    let featured = books.filter((b) => b.status === "currentlyReading");
    setFeaturedBooks(featured);
  }, [books]);

  useEffect(() => {
    setFeaturedTVShows(tvShows.filter((t) => t.status === "watching"));
  }, [tvShows]);

  useEffect(() => {
    setFeaturedMovies(movies.filter((m) => m.status === "wantToWatch"));
  }, [movies]);

  useEffect(() => {
    setFeaturedVideoGames(videoGames.filter((v) => v.status === "playing"));
  }, [videoGames]);

  return (
    <div className="">
      <div className="py-4">
        <h1 className="text-4xl text-center">Currently Reading</h1>
        <div dir="rtl">
          <Ticker
            items={featuredBooks}
            speed={50}
            gap={20}
            renderItem={(b) => (
              <img
                src={b.coverUrl}
                onClick={() => navigate(`/library/books/${b._id}`)}
                alt={b.title}
                style={{
                  width: 200,
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 14,
                  display: "block",
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="py-4">
        <h1 className="text-4xl text-center">Currently Watching</h1>
        <div dir="rtl">
          <Ticker
            items={featuredTVShows}
            speed={50}
            gap={20}
            renderItem={(t) => (
              <img
                src={t.posterUrl}
                alt={t.title}
                onClick={() => navigate(`/library/tvshows/${t._id}`)}
                style={{
                  width: 200,
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 14,
                  display: "block",
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="py-4">
        <h1 className="text-4xl text-center">Movies to Watch</h1>
        <div dir="rtl">
          <Ticker
            items={featuredMovies}
            speed={50}
            gap={20}
            renderItem={(m) => (
              <img
                src={m.posterUrl}
                onClick={() => navigate(`/library/movies/${m._id}`)}
                alt={m.title}
                style={{
                  width: 200,
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 14,
                  display: "block",
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="py-4">
        <h1 className="text-4xl text-center">Currently Playing</h1>
        <div dir="rtl">
          <Ticker
            items={featuredVideoGames}
            speed={50}
            gap={20}
            renderItem={(v) => (
              <img
                src={v.posterUrl}
                alt={v.title}
                onClick={() => navigate(`/library/videogames/${v._id}`)}
                style={{
                  width: 200,
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 14,
                  display: "block",
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureBanner;
