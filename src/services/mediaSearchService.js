import axios from "axios";
import api from "@/services/api";

export async function searchGoogleBooks(query, searchBy = "title") {
  const q = searchBy === "author" ? `inauthor:${query}` : `intitle:${query}`;
  const encodedQuery = encodeURIComponent(q);

  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&maxResults=10&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
  );

  return res.data.items || [];
}

export async function searchMovies(query, getAccessTokenSilently) {
  const token = await getAccessTokenSilently();

  const res = await api.get(
    `/tmdb/search/movie?q=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data?.results || [];
}

export async function searchTv(query, getAccessTokenSilently) {
  const token = await getAccessTokenSilently();

  const res = await api.get(
    `/tmdb/search/tv?q=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data?.results || [];
}

export async function searchGames(query, getAccessTokenSilently) {
  const token = await getAccessTokenSilently();

  const res = await api.get(
    `/igdb/search/games?q=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data || [];
}

export async function fetchDetails(item, mediaType, getAccessTokenSilently) {
  if (mediaType === "book") return item;

  const token = await getAccessTokenSilently();

  if (mediaType === "movie") {
    const res = await api.get(`/tmdb/movie/${item.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  if (mediaType === "tv") {
    const res = await api.get(`/tmdb/tv/${item.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  if (mediaType === "videogame") {
    const res = await api.get(`/igdb/games/${item.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  return item;
}