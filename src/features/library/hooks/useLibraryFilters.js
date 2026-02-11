// import { useMemo, useState } from "react";

// export function useLibraryFilters(
//   books = [],
//   movies = [],
//   tvShows = [],
//   videoGames = [],
// ) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedStatuses, setSelectedStatuses] = useState([]);
//   const [sortKey, setSortKey] = useState(null);

//   const q = searchQuery.trim().toLowerCase();

//   const filteredBooks = useMemo(() => {
//     let filtered = [...books];

//     if (selectedGenres.length) {
//       filtered = filtered.filter((b) =>
//         selectedGenres.every((g) =>
//           (b.genres || []).some((bg) => bg.toLowerCase() === g.toLowerCase()),
//         ),
//       );
//     }

//     if (selectedStatuses.length) {
//       filtered = filtered.filter((b) => selectedStatuses.includes(b.status));
//     }

//     if (q) {
//       filtered = filtered.filter((b) =>
//         [b.title, b.series, ...(b.author || [])]
//           .join(" ")
//           .toLowerCase()
//           .includes(q),
//       );
//     }

//     return filtered;
//   }, [books, selectedGenres, selectedStatuses, q]);

//   const filteredVideoGames = useMemo(() => {
//     let filtered = [...videoGames];

//     if (selectedGenres.length) {
//       filtered = filtered.filter((v) =>
//         selectedGenres.every((sel) =>
//           (v.genres || []).some((vv) => vv.toLowerCase() === sel.toLowerCase()),
//         ),
//       );
//     }

//     if (selectedStatuses.length) {
//       filtered = filtered.filter((v) => selectedStatuses.includes(v.status));
//     }

//     if (q) {
//       filtered = filtered.filter((g) =>
//         [
//           v.title,
//           v.series,
//           ...(g.developer || []),
//           ...(g.publisher || []),
//           ...(g.actors || []),
//         ]
//           .join(" ")
//           .toLowerCase()
//           .includes(q),
//       );
//     }

//     return filtered;
//   }, [videoGames, selectedGenres, selectedStatuses, q]);

//   const filteredTVShows = useMemo(() => {
//     let filtered = [...tvShows];

//     if (selectedGenres.length) {
//       filtered = filtered.filter((t) =>
//         selectedGenres.every((sel) =>
//           (t.genres || []).some((tt) => tt.toLowerCase() === sel.toLowerCase()),
//         ),
//       );
//     }

//     if (selectedStatuses.length) {
//       filtered = filtered.filter((t) => selectedStatuses.includes(t.status));
//     }

//     if (q) {
//       filtered = filtered.filter((t) =>
//         [
//           t.title,
//           t.showCreator,
//           ...(t.seasons || []),
//           ...(g.execProducers || []),
//           ...(g.actors || []),
//         ]
//           .join(" ")
//           .toLowerCase()
//           .includes(q),
//       );
//     }

//     return filtered;
//   }, [tvShows, selectedGenres, selectedStatuses, q]);

//   const filteredMovies = useMemo(() => {
//     let filtered = [...movies];

//     if (selectedGenres.length) {
//       filtered = filtered.filter((m) =>
//         selectedGenres.every((sel) =>
//           (m.genres || []).some((mm) => mm.toLowerCase() === sel.toLowerCase()),
//         ),
//       );
//     }

//     if (selectedStatuses.length) {
//       filtered = filtered.filter((m) => selectedStatuses.includes(m.status));
//     }

//     if (q) {
//       filtered = filtered.filter((m) =>
//         [
//           m.title,
//           m.series,
//           ...(m.director || []),
//           ...(m.studio || []),
//           ...(m.actors || []),
//         ]
//           .join(" ")
//           .toLowerCase()
//           .includes(q),
//       );
//     }

//     return filtered;
//   }, [movies, selectedGenres, selectedStatuses, q]);

//   const clearFilters = () => {
//     setSearchQuery("");
//     setSelectedGenres([]);
//     setSelectedStatuses([]);
//     setSortKey(null);
//   };

//   return {
//     filteredBooks,
//     filteredVideoGames,
//     filteredTVShows,
//     filteredMovies,
//     searchQuery,
//     setSearchQuery,
//     selectedGenres,
//     setSelectedGenres,
//     selectedStatuses,
//     setSelectedStatuses,
//     sortKey,
//     setSortKey,
//     clearFilters,
//   };
// }

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

export function useLibraryFilters({ books = [], movies = [], tvShows = [], videoGames = [] } = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortKey, setSortKey] = useState(null);

  const q = searchQuery.trim().toLowerCase();

  const filteredBooks = useMemo(
    () => applyFilters(books, { selectedGenres, selectedStatuses, q }, "books"),
    [books, selectedGenres, selectedStatuses, q]
  );

  const filteredMovies = useMemo(
    () => applyFilters(movies, { selectedGenres, selectedStatuses, q }, "movies"),
    [movies, selectedGenres, selectedStatuses, q]
  );

  const filteredTVShows = useMemo(
    () => applyFilters(tvShows, { selectedGenres, selectedStatuses, q }, "tvshows"),
    [tvShows, selectedGenres, selectedStatuses, q]
  );

  const filteredVideoGames = useMemo(
    () => applyFilters(videoGames, { selectedGenres, selectedStatuses, q }, "videogames"),
    [videoGames, selectedGenres, selectedStatuses, q]
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