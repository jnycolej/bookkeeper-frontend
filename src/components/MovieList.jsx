//Component to display the list of books

import React from "react";
import { formatDate } from "@/utils/date";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text, query }) {
  if (!query) return <>{text}</>;
  const q = query.trim();
  if (!q) return <>{text}</>;

  const safe = escapeRegExp(q);
  const parts = String(text).split(new RegExp(`(${safe})`, "gi"));

  return (
    <>
      {parts.map((part, idx) => {
        const match = part.toLowerCase();
        return match ? (
          <mark key={idx} className="rounded bg-secondary/30 px-0.5">
            {part}
          </mark>
        ) : (
          <span key={idx}>{part}</span>
        );
      })}
    </>
  );
}

const YesNoIcon = ({ value }) => (
  <span
    className={
      value ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
    }
    aria-label={value ? "Yes" : "No"}
  >
    {value ? "✓" : "✕"}
  </span>
);
const MovieList = ({ books, searchQuery, onRowClick, onDelete }) => {
  return (
    <div className="rounded-lg bg-secondary p-2">
      <div className="overflow-x-auto rounded-md bg-light">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-secondary text-light">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Title</th>
              <th className="px-3 py-2 text-left font-semibold">Director</th>
              <th className="px-3 py-2 text-left font-semibold">Series</th>
              <th className="px-3 py-2 text-left font-semibold">#</th>
              <th className="px-3 py-2 text-left font-semibold">Genres</th>
              <th className="px-3 py-2 text-left font-semibold">Release Year</th>
              <th className="px-3 py-2 text-left font-semibold">Duration</th>
              <th className="px-3 py-2 text-left font-semibold">Status</th>
              <th className="px-3 py-2 text-left font-semibold">Studio</th>
              <th className="px-3 py-2 text-left font-semibold">Delete</th>
            </tr>
          </thead>

          <tbody>
            {books.length ? (
              books.map((book, idx) => (
                <tr
                  key={book._id}
                  onClick={() => onRowClick(book._id)}
                  className={[
                    "cursor-pointer border-t border-secondary/40",
                    idx % 2 === 0 ? "bg-secondary/5" : "bg-dark/5",
                    "hover:bg-body",
                  ].join(" ")}
                >
                  <td className="px-3 py-2">
                    <HighlightText text={book.title} query={searchQuery} />
                  </td>

                  <td className="px-3 py-2">
                    <HighlightText
                      text={book.series || ""}
                      query={searchQuery}
                    />
                  </td>

                  <td className="px-3 py-2">
                    {book.seriesNum ? `# ${book.seriesNum}` : "N/A"}
                  </td>

                  <td className="px-3 py-2">
                    <HighlightText
                      text={(book.author || []).join(", ")}
                      query={searchQuery}
                    />
                  </td>

                  <td className="px-3 py-2">
                    {(book.genres || []).join(", ")}
                  </td>

                  <td className="px-3 py-2">{book.publicationYear}</td>
                  <td className="px-3 py-2">{book.pageCount}</td>
                  <td className="px-3 py-2">{book.status == "currentlyReading" ? "currently reading" : book.status}</td>
                  <td className="px-3 py-2">{formatDate(book.dateFinished)}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="px-3 py-2 rounded-md border"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(book);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-text/70">
                  No movies match the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieList;
