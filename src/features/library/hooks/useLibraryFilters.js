import { useMemo, useState } from "react";

export function useLibraryFilters(books = [], movies = [], videoGames = []) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortKey, setSortKey] = useState(null);

  const q = searchQuery.trim().toLowerCase();

  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    if (selectedGenres.length) {
      filtered = filtered.filter((b) =>
        selectedGenres.every((g) =>
          (b.genres || []).some((bg) => bg.toLowerCase() === g.toLowerCase())
        )
      );
    }

    if (selectedStatuses.length) {
      filtered = filtered.filter((b) => selectedStatuses.includes(b.status));
    }

    if (q) {
      filtered = filtered.filter((b) =>
        [b.title, b.series, ...(b.author || [])].join(" ").toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [books, selectedGenres, selectedStatuses, q]);

  const filteredVideoGames = useMemo(() => {
    let filtered = [...videoGames];

    if (selectedGenres.length) {
      filtered = filtered.filter((g) =>
        selectedGenres.every((sel) =>
          (g.genres || []).some((gg) => gg.toLowerCase() === sel.toLowerCase())
        )
      );
    }

    if (selectedStatuses.length) {
      filtered = filtered.filter((g) => selectedStatuses.includes(g.status));
    }

    if (q) {
      filtered = filtered.filter((g) =>
        [
          g.title,
          g.series,
          ...(g.developer || []),
          ...(g.publisher || []),
          ...(g.actors || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return filtered;
  }, [videoGames, selectedGenres, selectedStatuses, q]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedStatuses([]);
    setSortKey(null);
  };

  return {
    filteredBooks,
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