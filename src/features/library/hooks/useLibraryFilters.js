import { useMemo, useState } from "react";

export function useLibraryFilters(books, movies) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortKey, setSortKey] = useState(null);

  const filteredBooks = useMemo(() => {
    let filtered = books;

    if (selectedGenres.length) {
      filtered = filtered.filter((b) =>
        selectedGenres.every((g) =>
          (b.genres || []).some(
            (bg) => bg.toLowerCase() === g.toLowerCase()
          )
        )
      );
    }

    if (selectedStatuses.length) {
      filtered = filtered.filter((b) =>
        selectedStatuses.includes(b.status)
      );
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((b) =>
        [b.title, b.series, ...(b.author || [])]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    const sorted = [...filtered];
    const sorters = {
      "author-asc": (a, b) =>
        (a.author?.[0] || "").localeCompare(b.author?.[0] || ""),
      "author-desc": (a, b) =>
        (b.author?.[0] || "").localeCompare(a.author?.[0] || ""),
      "title-asc": (a, b) => (a.title || "").localeCompare(b.title || ""),
      "title-desc": (a, b) => (b.title || "").localeCompare(a.title || ""),
      "year-asc": (a, b) => (a.publicationYear || 0) - (b.publicationYear || 0),
      "year-desc": (a, b) => (b.publicationYear || 0) - (a.publicationYear || 0),
      "page-asc": (a, b) => (a.pageCount || 0) - (b.pageCount || 0),
      "page-desc": (a, b) => (b.pageCount || 0) - (a.pageCount || 0),
    };

    if (sortKey && sorters[sortKey]) {
      sorted.sort(sorters[sortKey]);
    }

    return sorted;
  }, [books, searchQuery, selectedGenres, selectedStatuses, sortKey]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedStatuses([]);
    setSortKey(null);
  };

  return {
    filteredBooks,
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
