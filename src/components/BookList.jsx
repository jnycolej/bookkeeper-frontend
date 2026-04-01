//Component to display the list of books

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
import { BookRow } from "@/features/library/components/BookRow";

const BookList = ({
  books,
  searchQuery,
  onRowClick,
  onDelete,
  pageSize = 10,
}) => {
  const safeBooks = Array.isArray(books) ? books : [];

  const { page, totalPages, pagedItems, pageItems, goTo, startItem, endItem } =
    usePagination(safeBooks, pageSize);

  return (
    <div className="rounded-xl bg-red-950/30 p-2 mx-auto w-9/10 overscroll-x-contain">
      <div className="overflow-x-auto rounded-md bg-light">
        <table className="min-w-full">
          <thead className="bg-red-900/80 text-stone-50 tracking-wide">
            <tr>
              <th className="px-3 py-2 text-center font-semibold">Title</th>
              <th className="px-3 py-2 text-center font-semibold">Series</th>
              <th className="px-3 py-2 text-center font-semibold">#</th>
              <th className="px-3 py-2 text-center font-semibold">Author</th>
              <th className="px-3 py-2 text-center font-semibold">Genres</th>
              <th className="px-3 py-2 text-center font-semibold">Year</th>
              <th className="px-3 py-2 text-center font-semibold">Pages</th>
              <th className="px-3 py-2 text-center font-semibold">Status</th>
              <th className="px-3 py-2 text-center font-semibold">
                Date Finished
              </th>
              <th className="px-3 py-2 text-center font-semibold">KU</th>
              <th className="px-3 py-2 text-center font-semibold">Libby</th>
              <th className="px-3 py-2 text-center font-semibold">Edit</th>
              <th className="px-3 py-2 text-center font-semibold">Delete</th>
            </tr>
          </thead>

          <tbody>
            {safeBooks.length ? (
              pagedItems.map((book, idx) => (
                <BookRow
                  key={book._id}
                  book={book}
                  idx={idx}
                  searchQuery={searchQuery}
                  onRowClick={onRowClick}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={13} className="px-3 py-6 text-center text-text/70">
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
