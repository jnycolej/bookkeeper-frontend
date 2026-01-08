import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import GenreFilter from "../components/GenreFilter";
import StatusFilter from "../components/StatusFilter";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import NavBar from "../components/NavBar";
import BookList from "../components/BookList";
import api from "../services/api";
import { getBooks, getBookCounts } from "../services/bookService";
import "../assets/bookkeeper.css";
import bookkeeperBackground from "../assets/BookKeeperBackground.png";

const LibraryPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [books, setBooks] = useState([]); //Keeps track of books
  const [filteredBooks, setFilteredBooks] = useState([]); //tracks the list of books after filtering
  const [searchQuery, setSearchQuery] = useState(""); //holds the search
  const [selectedGenres, setSelectedGenres] = useState([]); //tracks the genres selected in the filtering
  const [selectedStatuses, setSelectedStatuses] = useState([]); //tracks the statuses selected in the filtering
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
      setBooks(data);
    };
    fetchBooks();
  }, [getAccessTokenSilently]);

  //Sort books based on criteria
  const handleSort = (sortType) => {
    let sortedBooks;
    switch (sortType) {
      case "author-asc":
        sortedBooks = [...filteredBooks].sort((a, b) =>
          a.author[0].localeCompare(b.author[0])
        );
        break;
      case "author-desc":
        sortedBooks = [...filteredBooks].sort((a, b) =>
          b.author[0].localeCompare(a.author[0])
        );
        break;
      case "title-asc":
        sortedBooks = [...filteredBooks].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "title-desc":
        sortedBooks = [...filteredBooks].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "year-asc":
        sortedBooks = [...filteredBooks].sort(
          (a, b) => a.publicationYear - b.publicationYear
        );
        break;
      case "year-desc":
        sortedBooks = [...filteredBooks].sort(
          (a, b) => b.publicationYear - a.publicationYear
        );
        break;
      case "page-asc":
        sortedBooks = [...filteredBooks].sort(
          (a, b) => a.pageCount - b.pageCount
        );
        break;
      case "page-desc":
        sortedBooks = [...filteredBooks].sort(
          (a, b) => b.pageCount - a.pageCount
        );
        break;
      default:
        sortedBooks = filteredBooks;
    }
    setFilteredBooks(sortedBooks);
  };

  // Function to highlight search matches
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // useEffect to filter books whenever searchQuery or selectedGenres change
  useEffect(() => {
    let filtered = books;

    // Filter by genres if any are selected
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(
        (book) =>
          Array.isArray(book.genres) &&
          selectedGenres.every((selectedGenre) =>
            book.genres.some(
              (bookGenre) =>
                bookGenre.toLowerCase() === selectedGenre.toLowerCase()
            )
          )
      );
    }

    // Filter by status if any are selected
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((book) =>
        // assumes your book model has a `status` field like 'read', 'want', etc.
        selectedStatuses.includes(book.status)
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerCaseQuery) ||
          book.author.some((author) =>
            author.toLowerCase().includes(lowerCaseQuery)
          ) ||
          book.series?.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredBooks(filtered);
  }, [books, selectedGenres, selectedStatuses, searchQuery]);

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

//   const container = {
//     width: 480,
//     height: "60vh",
//     maxHeight: 360,
//     borderRadius: 10,
//     background: "white",
//     overflow: "hidden",
//     boxShadow:
//       "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
//     display: "flex",
//     flexDirection: "column",
//   };

//   const nav = {
//     background: "#fdfdfd",
//     padding: "5px 5px 0",
//     borderRadius: "10px",
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//     borderBottom: "1px solid #eeeeee",
//     height: 44,
//   };

//   const tabsStyles = {
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//     fontWeight: 500,
//     fontSize: 14,
//   };

//   const tabsContainer = {
//     ...tabsStyles,
//     display: "flex",
//     width: "100%",
//   };

//   const tab = {
//     ...tabsStyles,
//     borderRadius: 5,
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//     width: "100%",
//     padding: "10px 15px",
//     position: "relative",
//     background: "white",
//     cursor: "pointer",
//     height: 24,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flex: 1,
//     minWidth: 0,
//     userSelect: "none",
//     color: "#0f1115",
//   };

//   const underline = {
//     position: "absolute",
//     bottom: -2,
//     left: 0,
//     right: 0,
//     height: 2,
//     background: "var(--accent)",
//   };

//   const iconContainer = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   };

//   const icon = {
//     fontSize: 128,
//   };

//   const allIngredients = [
//     { icon: "🍅", label: "Tomato" },
//     { icon: "🥬", label: "Lettuce" },
//     { icon: "🧀", label: "Cheese" },
//     { icon: "🥕", label: "Carrot" },
//     { icon: "🍌", label: "Banana" },
//     { icon: "🫐", label: "Blueberries" },
//     { icon: "🥂", label: "Champers?" },
//   ];
//   const allMedia = [
//     {
//       icon: "📚",
//       label: "Books",
//       component: (
//         <BookList
//           books={filteredBooks}
//           searchQuery={searchQuery}
//           onRowClick={(id) => navigate(`/books/${id}`)}
//         />
//       ),
//     },
//     { icon: "🎬", label: "Movies" },
//   ];
//   const [booksTab, moviesTab] = allMedia;
//   const tabs = [booksTab, moviesTab];
//   const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="bookKeeper-library-background">
      <NavBar />
      <h3 className="display-3 align-items-center text-center mb-3">
        My Library
      </h3>
      <div className="d-flex flex-wrap align-items-center align-content-center gap-3 p-3">
        <button
          type="button"
          className="btn btn-primary common-height"
          onClick={() => navigate("/bookform")}
        >
          Add Book
        </button>
        <SortButton handleSort={handleSort} />
        <GenreFilter handleFilter={handleGenreFilter} />
        <StatusFilter handleFilter={handleStatusFilter} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="d-flex align-items-center flex-wrap">
        <h4 className="me-3 text-light">Status Summary: </h4>
        <ul className="list-group list-group-horizontal-sm mb-0">
          <li className="list-group-item">Read: {bookCounts.read}</li>
          <li className="list-group-item">
            Currently Reading: {bookCounts.currentlyReading}
          </li>
          <li className="list-group-item">Want: {bookCounts.want}</li>
          <li className="list-group-item">Owned: {bookCounts.owned}</li>
          <li className="list-group-item">
            Total Unread: {bookCounts.want + bookCounts.owned}
          </li>
          <li className="list-group-item">
            Total:{" "}
            {bookCounts.read +
              bookCounts.currentlyReading +
              bookCounts.want +
              bookCounts.owned}
          </li>
        </ul>
      </div>
      <BookList
        books={filteredBooks}
        searchQuery={searchQuery}
        onRowClick={(id) => navigate(`/books/${id}`)}
      />
    </div>
  );
};

export default LibraryPage;
