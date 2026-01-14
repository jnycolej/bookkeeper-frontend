//Component to display the list of books

import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { formatDate } from "@/utils/date";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

const BookList = ({
  books,
  searchQuery,
  onRowClick,
  onDelete,
  pageSize = 10,
}) => {
  const [page, setPage] = useState(1);
  const navigation = useNavigate();
  const totalPages = Math.max(1, Math.ceil(books.length / pageSize));

  //keeps page valid even during search or filter
  useEffect(() => {
    setPage((prev) => Math.min(Math.max(1, prev), totalPages));
  }, [totalPages]);

  const pageBooks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return books.slice(start, start + pageSize);
  }, [books, page, pageSize]);

  const pageItems = useMemo(() => {
    const siblingCount = 1;
    const items = [];

    const left = Math.max(1, page - siblingCount);
    const right = Math.min(totalPages, page + siblingCount);

    items.push(1);

    if (left > 2) items.push("ellipsis-left");

    for (let p = Math.max(2, left); p <= Math.min(totalPages - 1, right); p++) {
      items.push(p);
    }

    if (right < totalPages - 1) items.push("ellipsis-right");

    //always show last (if more than 1 page)
    if (totalPages > 1) items.push(totalPages);

    //remove duplicates
    return items.filter((v, i, arr) => arr.indexOf(v) === i);
  }, [page, totalPages]);

  const goTo = (p) => setPage(Math.min(totalPages, Math.max(1, p)));

  const startItem = books.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, books.length);

  return (
    <div className="rounded-lg bg-secondary p-2">
      <div className="overflow-x-auto rounded-md bg-light">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-secondary text-light">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Title</th>
              <th className="px-3 py-2 text-left font-semibold">Series</th>
              <th className="px-3 py-2 text-left font-semibold">#</th>
              <th className="px-3 py-2 text-left font-semibold">Author</th>
              <th className="px-3 py-2 text-left font-semibold">Genres</th>
              <th className="px-3 py-2 text-left font-semibold">Year</th>
              <th className="px-3 py-2 text-left font-semibold">Pages</th>
              <th className="px-3 py-2 text-left font-semibold">Status</th>
              <th className="px-3 py-2 text-left font-semibold">
                Date Finished
              </th>
              <th className="px-3 py-2 text-left font-semibold">KU</th>
              <th className="px-3 py-2 text-left font-semibold">Libby</th>
              <th className="px-3 py-2 text-left font-semibold">Edit</th>
              <th className="px-3 py-2 text-left font-semibold">Delete</th>
            </tr>
          </thead>

          <tbody>
            {books.length ? (
              pageBooks.map((book, idx) => (
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
                  <td className="px-3 py-2">
                    {book.status == "currentlyReading"
                      ? "currently reading"
                      : book.status}
                  </td>
                  <td className="px-3 py-2">{formatDate(book.dateFinished)}</td>
                  <td className="px-3 py-2">
                    <YesNoIcon value={!!book.kindleUnlimited} />
                  </td>
                  <td className="px-3 py-2">
                    <YesNoIcon value={!!book.libby} />
                  </td>
                  <td className="px-3 py-2">
                    <button
                      className="px-3 py-2 rounded-md border"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigation(`/books/${book._id}/edit`);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="px-3 py-2 rounded-md bg-red-900 text-white border"
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
                  No books match the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: count + pagination */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-text/70">
          Showing {startItem}-{endItem} of {books.length}
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(page - 1);
                  }}
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {pageItems.map((item) => {
                if (typeof item === "string") {
                  return (
                    <PaginationItem key={item}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={item === page}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(page + 1);
                  }}
                  aria-disabled={page === totalPages}
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default BookList;
