//Component to display the list of movies

import React from "react";
import { usePagination } from "@/features/library/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MovieRow } from "@/features/library/components/MovieRow";
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
const MovieList = ({ movies, searchQuery, onRowClick, onDelete , pageSize = 10,}) => {
  const safeMovies = Array.isArray(movies) ? movies : [];

  const { page, totalPages, pagedItems, pageItems, goTo, startItem, endItem} = usePagination(safeMovies, pageSize);

  return (
    <div className="rounded-lg bg-secondary p-2">
      <div className="overflow-x-auto rounded-md bg-light">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-secondary text-light">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Title</th>
              <th className="px-3 py-2 text-left font-semibold">Director</th>
              <th className="px-3 py-2 text-left font-semibold">Actors</th>
              <th className="px-3 py-2 text-left font-semibold">
                Release Year
              </th>
              <th className="px-3 py-2 text-left font-semibold">Duration</th>
              <th className="px-3 py-2 text-left font-semibold">Genres</th>
              <th className="px-3 py-2 text-left font-semibold">Studio</th>
              <th className="px-3 py-2 text-left font-semibold">Series</th>
              <th className="px-3 py-2 text-left font-semibold">#</th>
              <th className="px-3 py-2 text-left font-semibold">Status</th>
              <th className="px-3 py-2 text-left font-semibold">Edit</th>
              <th className="px-3 py-2 text-left font-semibold">Delete</th>
            </tr>
          </thead>

          <tbody>
            {safeMovies.length ? (
              pagedItems.map((movie, idx) => (
                <MovieRow
                  key={movie._id}
                  movie={movie}
                  idx={idx}
                  searchQuery={searchQuery}
                  onRowClick={onRowClick}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={13} className="px-3 py-6 text-center text-text/70">
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
