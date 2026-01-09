import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {Button } from "@/components/ui/button";
import GenreFilter from "../components/GenreFilter";
import StatusFilter from "../components/StatusFilter";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import NavBar from "../components/NavBar";
import BookList from "../components/BookList";


import { getBooks, getBookCounts } from "../services/bookService";

const LibraryPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [books, setBooks] = useState([]); //Keeps track of books
  // const [filteredBooks, setFilteredBooks] = useState([]); //tracks the list of books after filtering
  const [searchQuery, setSearchQuery] = useState(""); //holds the search
  const [selectedGenres, setSelectedGenres] = useState([]); //tracks the genres selected in the filtering
  const [selectedStatuses, setSelectedStatuses] = useState([]); //tracks the statuses selected in the filtering
  const [sortKey, setSortKey] = useState(null);

  const handleGenreFilter = (genres) => setSelectedGenres(genres);
  const handleStatusFilter = (statuses) => setSelectedStatuses(statuses);

  //tracks the books read
  const [bookCounts, setBookCounts] = useState({
    read: 0,
    currentlyReading: 0,
    want: 0,
    owned: 0,
  });

  const navigate = useNavigate();

  //Get all books
  useEffect(() => {
    const fetchBooks = async () => {
      const token = await getAccessTokenSilently();
      const data = await getBooks(token);
      setBooks(Array.isArray(data) ? data : []);
    };
    fetchBooks();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await getBookCounts(token);
        // console.log("count payload:", data);

        setBookCounts({
          read: data.read || 0,
          currentlyReading: data.currentlyReading || 0,
          want: data.want || 0,
          owned: data.owned || 0,
        });
      } catch (err) {
        console.error("Error fetching book counts:", err);
      }
    };
    fetchCounts();
  }, [getAccessTokenSilently]);

  const filteredBooks = useMemo(() => {
    let filtered = books;

    //Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((book) => {
        const bookGenres = Array.isArray(book.genres) ? book.genres : [];
        return selectedGenres.every((g) =>
          bookGenres.some(
            (bg) => String(bg).toLowerCase() === String(g).toLowerCase()
          )
        );
      });
    }

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((book) =>
        selectedStatuses.includes(book.status)
      );
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((book) => {
        const title = String(book.title || "").toLowerCase();
        const series = String(book.series || "").toLowerCase();
        const authors = Array.isArray(book.author) ? book.author : [];
        return (
          title.includes(q) ||
          series.includes(q) ||
          authors.some((a) => String(a).toLowerCase().includes(q))
        );
      });
    }
    // Sort
    const sorted = [...filtered];
    switch (sortKey) {
      case "author-asc":
        sorted.sort((a, b) =>
          (a.author?.[0] || "").localeCompare(b.author?.[0] || "")
        );
        break;
      case "author-desc":
        sorted.sort((a, b) =>
          (b.author?.[0] || "").localeCompare(a.author?.[0] || "")
        );
        break;
      case "title-asc":
        sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "title-desc":
        sorted.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
        break;
      case "year-asc":
        sorted.sort(
          (a, b) => (a.publicationYear || 0) - (b.publicationYear || 0)
        );
        break;
      case "year-desc":
        sorted.sort(
          (a, b) => (b.publicationYear || 0) - (a.publicationYear || 0)
        );
        break;
      case "page-asc":
        sorted.sort((a, b) => (a.pageCount || 0) - (b.pageCount || 0));
        break;
      case "page-desc":
        sorted.sort((a, b) => (b.pageCount || 0) - (a.pageCount || 0));
        break;
      default:
        break;
    }

    return sorted;
  }, [books, selectedGenres, selectedStatuses, searchQuery, sortKey]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedStatuses([]);
    setSortKey(null);
  };

  const totalUnread = bookCounts.want + bookCounts.owned;
  const totalAll =
    bookCounts.read +
    bookCounts.currentlyReading +
    bookCounts.want +
    bookCounts.owned;

  return (
    <div className="bookKeeper-library-background min-h-screen">
      <NavBar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <h1 className="mb-5 text-center text-4xl font-semibold ">
          My Library
        </h1>

        {/* Controls */}
        <div className="mb-4 rounded-2xl bg-dark/70 p-4 text-light backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <button className="bg-secondary text-light px-4 py-2 rounded-md">
  Test
</button>

            <button
              type="button"
              className="bk-btn-primary w-full"
              onClick={() => navigate("/bookform")}
            >
              Add Book
            </button>

            <SortButton handleSort={setSortKey} />
            <GenreFilter handleFilter={setSelectedGenres} />
            <StatusFilter handleFilter={setSelectedStatuses} />

            <div className="lg:col-span-2">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <button
              type="button"
              className="bk-btn-outline w-full"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Status Summary */}
        <div className="mb-4 rounded-xl bg-dark/70 p-4 text-light">
          <div className="mb-2 text-lg font-semibold">Status Summary</div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Read</div>
              <div className="text-lg font-semibold">{bookCounts.read}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Reading</div>
              <div className="text-lg font-semibold">
                {bookCounts.currentlyReading}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Want</div>
              <div className="text-lg font-semibold">{bookCounts.want}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Owned</div>
              <div className="text-lg font-semibold">{bookCounts.owned}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Total Unread</div>
              <div className="text-lg font-semibold">{totalUnread}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Total</div>
              <div className="text-lg font-semibold">{totalAll}</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <BookList
          books={filteredBooks}
          searchQuery={searchQuery}
          onRowClick={(id) => navigate(`/books/${id}`)}
        />
      </div>
    </div>
  );
};

export default LibraryPage;
