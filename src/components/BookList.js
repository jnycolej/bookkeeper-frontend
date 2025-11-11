//Component to display the list of books

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import GenreFilter from "./GenreFilter";
import StatusFilter from "./StatusFilter";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import NavBar from "./NavBar";
import api from "../services/api";
import { getBooks, getBookCounts } from "../services/bookService";
import "../assets/bookkeeper.css";

const BookList = ({ books, searchQuery, onRowClick }) => {
  const highlightText = (text, query) => {
    if (!query) return text;
    return text.replace(new RegExp(`(${query})`, "gi"), "<mark>$1</mark>");
  };

  return (
    <div className="list-body">
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Series</th>
              <th>Series Num</th>
              <th>Author</th>
              <th>Genres</th>
              <th>Year</th>
              <th>Page Count</th>
              <th>Status</th>
              <th>Kindle Unlimited</th>
              <th>Libby</th>
            </tr>
          </thead>
          <tbody>
            {books.length ? (
              books.map((book) => (
                <tr
                  key={book._id}
                  onClick={() => onRowClick(book._id)}
                  style={{ cursor: "pointer" }}
                >
                  <td
                    dangerouslySetInnerHTML={{
                      __html: highlightText(book.title, searchQuery),
                    }}
                  />
                  <td
                    dangerouslySetInnerHTML={{
                      __html: highlightText(book.series || "", searchQuery),
                    }}
                  />
                  <td>{book.seriesNum ? `# ${book.seriesNum}` : "N/A"}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: highlightText(
                        book.author.join(", "),
                        searchQuery
                      ),
                    }}
                  />
                  <td>{book.genres.join(", ")}</td>
                  <td>{book.publicationYear}</td>
                  <td>{book.pageCount}</td>
                  <td>{book.status}</td>
                  <td>{book.kindleUnlimited ? "Yes" : "No"}</td>
                  <td>{book.libby ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No books match the search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
