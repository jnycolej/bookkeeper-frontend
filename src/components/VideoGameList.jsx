//Component to display the list of movies

import React from "react";
import { formatDate } from "@/utils/date";
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
import { VideoGameRow } from "@/features/library/components/VideoGameRow";
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
const VideoGameList = ({
  videoGames,
  searchQuery,
  onRowClick,
  onDelete,
  pageSize = 10,
}) => {
  const safeVideoGames = Array.isArray(videoGames) ? videoGames : [];
  const { page, totalPages, pagedItems, pageItems, goTo, startItem, endItem } =
    usePagination(safeVideoGames, pageSize);
  return (
    <div className="rounded-lg bg-secondary p-2">
      <div className="overflow-x-auto rounded-md bg-light">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-secondary text-light">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Title</th>
              <th className="px-3 py-2 text-left font-semibold">Developer</th>
              <th className="px-3 py-2 text-left font-semibold">Actors</th>
              <th className="px-3 py-2 text-left font-semibold">
                Release Year
              </th>
              <th className="px-3 py-2 text-left font-semibold">Duration</th>
              <th className="px-3 py-2 text-left font-semibold">Genres</th>
              <th className="px-3 py-2 text-left font-semibold">
                Publisher(s)
              </th>
              <th className="px-3 py-2 text-left font-semibold">Series</th>
              <th className="px-3 py-2 text-left font-semibold">#</th>
              <th className="px-3 py-2 text-left font-semibold">Status</th>
                            <th className="px-3 py-2 text-left font-semibold">Edit</th>

              <th className="px-3 py-2 text-left font-semibold">Delete</th>
            </tr>
          </thead>

          <tbody>
            {safeVideoGames.length ? (
              pagedItems.map((videoGame, idx) => (
                <VideoGameRow
                  key={videoGame._id}
                  videoGame={videoGame}
                  idx={idx}
                  searchQuery={searchQuery}
                  onRowClick={onRowClick}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={11} className="px-3 py-6 text-center text-text/70">
                  No video games match the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Footer: count + pagination */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-text/70">
          Showing {startItem}-{endItem} of {videoGames.length}
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

export default VideoGameList;
