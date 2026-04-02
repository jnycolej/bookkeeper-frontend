import React, { useEffect, useState } from "react";

import { useBooksQuery } from "@/features/library/hooks/useBooksQuery";
import { useMoviesQuery } from "@/features/library/hooks/useMoviesQuery";
import { useGamesQuery } from "@/features/library/hooks/useGamesQuery";
import { useTVShowsQuery } from "@/features/library/hooks/useTVShowsQuery";

export const StatusSummary = ({ mediaType }) => {
  const { bookCounts } = useBooksQuery();
  const { movieCounts } = useMoviesQuery();
  const { videoGameCounts } = useGamesQuery();
  const { tvShowCounts } = useTVShowsQuery();

  const totalBooksUnread = (bookCounts.want || 0) + (bookCounts.owned || 0);
  const totalBooksAll =
    (bookCounts.read || 0) +
    (bookCounts.currentlyReading || 0) +
    (bookCounts.want || 0) +
    (bookCounts.owned || 0);

  const totalMoviesAll =
    (movieCounts.owned || 0) +
    (movieCounts.watching || 0) +
    (movieCounts.wantToWatch || 0) +
    (movieCounts.watched || 0);

  const totalTVShowsAll =
    (tvShowCounts.owned || 0) +
    (tvShowCounts.watching || 0) +
    (tvShowCounts.wantToWatch || 0) +
    (tvShowCounts.watched || 0);

  const totalVideoGamesAll =
    (videoGameCounts.completed || 0) +
    (videoGameCounts.owned || 0) +
    (videoGameCounts.wantToPlay || 0) +
    (videoGameCounts.playing || 0);

  switch (mediaType) {
    case "books":
      return (
        <div className="mx-auto my-4 w-full max-w-6xl rounded-xl bg-dark/70 p-4 text-light backdrop-blur-sm">
          {" "}
          <div className="mb-2 text-lg font-semibold">Status Summary</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-md bg-light/10 p-2">
              <div className="opacity-80">Read</div>
              <div className="text-lg font-semibold">
                {bookCounts.read || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 p-2">
              <div className="opacity-80">Currently Reading</div>
              <div className="text-lg font-semibold">
                {bookCounts.currentlyReading || 0}
              </div>
            </div>
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="opacity-80">Currently Rereading</div>
              <div className="text-lg font-semibold">
                {bookCounts.rereading || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="opacity-80">Want</div>
              <div className="text-lg font-semibold">
                {bookCounts.want || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="opacity-80">Owned</div>
              <div className="text-lg font-semibold">
                {bookCounts.owned || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="opacity-80">Total Unread</div>
              <div className="text-lg font-semibold">{totalBooksUnread}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="opacity-80">Total</div>
              <div className="text-lg font-semibold">{totalBooksAll}</div>
            </div>
          </div>
        </div>
      );
      break;
    case "movies":
      return (
        <div className="mx-auto my-4 w-full max-w-6xl rounded-xl bg-dark/70 p-4 text-light backdrop-blur-sm">
          {" "}
          <div className="mb-2 text-lg font-semibold">Status Summary</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Watched</div>
              <div className="text-lg font-semibold">
                {movieCounts.watched || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Watching</div>
              <div className="text-lg font-semibold">
                {movieCounts.watching || 0}
              </div>
            </div>
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Rewatching</div>
              <div className="text-lg font-semibold">
                {movieCounts.rewatching}
              </div>
            </div>
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Want to Watch</div>
              <div className="text-lg font-semibold">
                {movieCounts.wantToWatch || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Total</div>
              <div className="text-lg font-semibold">{totalMoviesAll}</div>
            </div>
          </div>
        </div>
      );
      break;
    case "tvshows":
      return (
        <div className="mx-auto my-4 w-full max-w-6xl rounded-xl bg-dark/70 p-4 text-light backdrop-blur-sm">
          {" "}
          <div className="mb-2 text-lg font-semibold">Status Summary</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Watched</div>
              <div className="text-lg font-semibold">
                {tvShowCounts.watched || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Watching</div>
              <div className="text-lg font-semibold">
                {tvShowCounts.watching || 0}
              </div>
            </div>
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Rewatching</div>
              <div className="text-lg font-semibold">
                {tvShowCounts.rewatching}
              </div>
            </div>
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Want to Watch</div>
              <div className="text-lg font-semibold">
                {tvShowCounts.wantToWatch || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Total</div>
              <div className="text-lg font-semibold">{totalTVShowsAll}</div>
            </div>
          </div>
        </div>
      );
      break;
    case "videogames":
      return (
        <div className="mx-auto my-4 w-full max-w-6xl rounded-xl bg-dark/70 p-4 text-light backdrop-blur-sm">
          {" "}
          <div className="mb-2 text-lg font-semibold">Status Summary</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className=" opacity-80">Completed</div>
              <div className="text-lg font-semibold">
                {videoGameCounts.completed || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Playing</div>
              <div className="text-lg font-semibold">
                {videoGameCounts.playing || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Replaying</div>
              <div className="text-lg font-semibold">
                {videoGameCounts.replaying}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Want to Play</div>
              <div className="text-lg font-semibold">
                {videoGameCounts.wantToPlay || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Total</div>
              <div className="text-lg font-semibold">{totalVideoGamesAll}</div>
            </div>
          </div>
        </div>
      );
      break;
    default:
      break;
  }
};
