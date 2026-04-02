
// src/features/library/hooks/useLibraryFilters.js
import { useMemo, useState } from "react";

const SEARCH_FIELDS_BY_MEDIA = {
  books: (b) => [b.title, b.series, ...(b.author || [])],
  movies: (m) => [m.title, m.series, ...(m.director || []), ...(m.studio || []), ...(m.actors || [])],
  tvshows: (t) => [t.title, t.showCreator, ...(t.execProducers || []), ...(t.actors || [])],
  videogames: (v) => [v.title, v.series, ...(v.developer || []), ...(v.publisher || []), ...(v.actors || [])],
};

function applyFilters(items, { selectedGenres, selectedStatuses, q }, mediaType) {
  let filtered = [...items];

  if (selectedGenres.length) {
    filtered = filtered.filter((x) =>
      selectedGenres.every((sel) =>
        (x.genres || []).some((g) => String(g).toLowerCase() === sel.toLowerCase())
      )
    );
  }

  if (selectedStatuses.length) {
    filtered = filtered.filter((x) => selectedStatuses.includes(x.status));
  }

  if (q) {
    const getFields = SEARCH_FIELDS_BY_MEDIA[mediaType] ?? ((x) => [x.title]);
    filtered = filtered.filter((x) =>
      getFields(x).join(" ").toLowerCase().includes(q)
    );
  }

  return filtered;
}

function compareStrings(a, b, dir = "asc") {
  const aa = String(a ?? "").toLowerCase();
  const bb = String(b ?? "").toLowerCase();
  return dir === "asc" ? aa.localeCompare(bb) : bb.localeCompare(aa);
}

function compareNumbers(a, b, dir = "asc") {
  const aa = Number(a ?? 0);
  const bb = Number(b ?? 0);
  return dir === "asc" ? aa - bb : bb - aa;
}

function applySort(items, sortKey, mediaType) {
  if (!sortKey) return items;

  const sorted = [...items];

  switch (sortKey) {
    case "title-asc":
      return sorted.sort((a, b) => compareStrings(a.title, b.title, "asc"));
    case "title-desc":
      return sorted.sort((a, b) => compareStrings(a.title, b.title, "desc"));
    
    case "year-asc":
      return sorted.sort((a, b) => compareNumbers(a.releaseYear ?? a.year, b.releaseYear ?? b.year, "asc"));
    case "year-desc":
      return sorted.sort((a, b) => compareNumbers(a.releaseYear ?? a.year, b.releaseYear ?? b.year, "desc"));

        case "author-asc":
      return mediaType === "books"
        ? sorted.sort((a, b) => compareStrings(a.author?.[0], b.author?.[0], "asc"))
        : sorted;

    case "author-desc":
      return mediaType === "books"
        ? sorted.sort((a, b) => compareStrings(a.author?.[0], b.author?.[0], "desc"))
        : sorted;

    case "director-asc":
      return mediaType === "movies"
        ? sorted.sort((a, b) => compareStrings(a.director?.[0], b.director?.[0], "asc"))
        : sorted;

    case "director-desc":
      return mediaType === "movies"
        ? sorted.sort((a, b) => compareStrings(a.director?.[0], b.director?.[0], "desc"))
        : sorted;

    case "showCreator-asc":
      return mediaType === "tvshows"
        ? sorted.sort((a, b) => compareStrings(a.showCreator, b.showCreator, "asc"))
        : sorted;

    case "showCreator-desc":
      return mediaType === "tvshows"
        ? sorted.sort((a, b) => compareStrings(a.showCreator, b.showCreator, "desc"))
        : sorted;

    case "page-asc":
      return mediaType === "books"
        ? sorted.sort((a, b) => compareNumbers(a.pageCount, b.pageCount, "asc"))
        : sorted;

    case "page-desc":
      return mediaType === "books"
        ? sorted.sort((a, b) => compareNumbers(a.pageCount, b.pageCount, "desc"))
        : sorted;

    case "duration-asc":
      return mediaType === "movies"
        ? sorted.sort((a, b) => compareNumbers(a.duration, b.duration, "asc"))
        : sorted;

    case "duration-desc":
      return mediaType === "movies"
        ? sorted.sort((a, b) => compareNumbers(a.duration, b.duration, "desc"))
        : sorted;

    case "avgDuration-asc":
      return mediaType === "tvshows"
        ? sorted.sort((a, b) => compareNumbers(a.avgDuration, b.avgDuration, "asc"))
        : sorted;

    case "avgDuration-desc":
      return mediaType === "tvshows"
        ? sorted.sort((a, b) => compareNumbers(a.avgDuration, b.avgDuration, "desc"))
        : sorted;

    default:
      return sorted;
  }
}

export function useLibraryFilters({ books = [], movies = [], tvShows = [], videoGames = [] } = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortKey, setSortKey] = useState(null);

  const q = searchQuery.trim().toLowerCase();

  const filteredBooks = useMemo(
    () => applySort(
      applyFilters(books, { selectedGenres, selectedStatuses, q }, "books"),
      sortKey,
      "books"
    ),
    [books, selectedGenres, selectedStatuses, q, sortKey]
  );

  const filteredMovies = useMemo(
    () => applySort(
      applyFilters(movies, { selectedGenres, selectedStatuses, q }, "movies"),
      sortKey,
      "movies"
    ),
    [movies, selectedGenres, selectedStatuses, q, sortKey]
  );

  const filteredTVShows = useMemo(
    () => applySort(
      applyFilters(tvShows, { selectedGenres, selectedStatuses, q }, "tvshows"),
      sortKey,
      "tvshows"
    ),
    [tvShows, selectedGenres, selectedStatuses, q, sortKey]
  );

  const filteredVideoGames = useMemo(
    () => applySort(
      applyFilters(videoGames, { selectedGenres, selectedStatuses, q }, "videogames"),
      sortKey,
      "videogames"
    ),
    [videoGames, selectedGenres, selectedStatuses, q, sortKey]
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedStatuses([]);
    setSortKey(null);
  };

  return {
    filteredBooks,
    filteredMovies,
    filteredTVShows,
    filteredVideoGames,
    searchQuery,
    setSearchQuery,
    selectedGenres,
    setSelectedGenres,
    selectedStatuses,
    setSelectedStatuses,
    sortKey,
    setSortKey,
    clearFilters,
  };
}