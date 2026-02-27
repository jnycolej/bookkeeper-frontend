import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Clapperboard, Tv, Book } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import GenreFilter from "../components/GenreFilter";
import StatusFilter from "../components/StatusFilter";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import NavBar from "../components/NavBar";
import BookList from "../components/BookList";
import MovieList from "../components/MovieList";
import TVShowList from "@/components/TVShowList";
import VideoGameList from "@/components/VideoGameList";
import { Controls } from "@/features/library/components/LibraryControlCenter";
import { useBooksQuery } from "@/features/library/hooks/useBooksQuery";
import { useMoviesQuery } from "@/features/library/hooks/useMoviesQuery";
import { useGamesQuery } from "@/features/library/hooks/useGamesQuery";
import { useTVShowsQuery } from "@/features/library/hooks/useTVShowsQuery";

import { useLibraryFilters } from "@/features/library/hooks/useLibraryFilters";

const LibraryPage = () => {
  const navigate = useNavigate();

  // 1) data
  const { books, bookCounts, deleteById } = useBooksQuery();
  const { movies, movieCounts, movieDeleteById } = useMoviesQuery();
  const { videoGames, videoGameCounts, videoGameDeleteById } = useGamesQuery();
  const { tvShows, tvShowCounts, tvShowDeleteById } = useTVShowsQuery();
  const [activeTab, setActiveTab] = useState("books");

  const {
    filteredBooks,
    filteredMovies,
    filteredTVShows,
    filteredVideoGames,
    searchQuery,
    setSearchQuery,
    selectedGenres,
    setSelectedGenres,
    selectedStatuses,
    setSelectedStatuses,
    sortKey,
    setSortKey,
    clearFilters,
  } = useLibraryFilters({books, movies, tvShows, videoGames});

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
  return (
    <div className="bookKeeper-library-background min-w-screen min-h-screen">
      <NavBar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <h1 className="mb-5 text-center text-6xl font-semibold">My Library</h1>

        <div className="flex justify-center w-full max-w-7xl flex-col gap-6">
          <Tabs value={activeTab} className="mb-5" onValueChange={setActiveTab}>
            <TabsList className="flex w-fit mx-auto bg-red-900/40">
              <TabsTrigger className="gap-2 text-2xl" value="books"><Book /> Books</TabsTrigger>
              <TabsTrigger className="gap-2 text-2xl" value="movies"><Clapperboard /> Movies</TabsTrigger>
              <TabsTrigger className="gap-2 text-2xl" value="tvshows"><Tv /> TV</TabsTrigger>
              <TabsTrigger className="gap-2 text-2xl" value="videogames"><Gamepad2 /> Games</TabsTrigger>
            </TabsList>

            <TabsContent value="books">
              <Card className="bg-transparent border-transparent">
                <CardContent className="grid gap-6">
                  {/* Controls */}
                  <Controls
                    mediaType="books"
                    addLabel="Add Book"
                    onAdd={() => navigate("/library/books/new")}
                    clearFilters={clearFilters}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortKey={sortKey}
                    setSortKey={setSortKey}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                  />
                  {/* Status Summary */}
                  <div className="mb-4 rounded-xl w-3/4 bg-dark/70 p-4 text-light">
                    <div className="mb-2 text-lg font-semibold">
                      Status Summary
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Read</div>
                        <div className="text-lg font-semibold">
                          {bookCounts.read || 0}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">
                          Currently Reading
                        </div>
                        <div className="text-lg font-semibold">
                          {bookCounts.currentlyReading || 0}
                        </div>
                      </div>
                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">
                          Currently Rereading
                        </div>
                        <div className="text-lg font-semibold">
                          {bookCounts.rereading}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Want</div>
                        <div className="text-lg font-semibold">
                          {bookCounts.want || 0}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Owned</div>
                        <div className="text-lg font-semibold">
                          {bookCounts.owned || 0}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Total Unread</div>
                        <div className="text-lg font-semibold">
                          {totalBooksUnread}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Total</div>
                        <div className="text-lg font-semibold">
                          {totalBooksAll}
                        </div>
                      </div>
                    </div>
                  </div>
                  <BookList
                    books={filteredBooks}
                    searchQuery={searchQuery}
                    onRowClick={(id) => navigate(`/library/books/${id}`)}
                    onDelete={deleteById}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="movies">
              <Card className="bg-transparent border-transparent">
                <CardContent className="grid gap-6">
                  <Controls
                    mediaType="movies"
                    addLabel="Add Movie"
                    onAdd={() => navigate("/library/movies/new")}
                    clearFilters={clearFilters}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortKey={sortKey}
                    setSortKey={setSortKey}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                  />

                  {/* Status Summary */}
                  <div className="mb-4 rounded-xl bg-dark/70 p-4 text-light">
                    <div className="mb-2 text-lg font-semibold">
                      Status Summary
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Watched</div>
                        <div className="text-lg font-semibold">
                          {movieCounts.watched || 0}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">
                          Currently Watching
                        </div>
                        <div className="text-lg font-semibold">
                          {movieCounts.watching || 0}
                        </div>
                      </div>
                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">
                          Currently Rewatching
                        </div>
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
                        <div className="text-lg font-semibold">
                          {totalMoviesAll}
                        </div>
                      </div>
                    </div>
                  </div>
                  <MovieList
                    movies={filteredMovies}
                    searchQuery={searchQuery}
                    onRowClick={(id) => navigate(`/library/movies/${id}`)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tvshows">
              <Card className="bg-transparent border-transparent">
                <CardContent className="grid gap-6">
                  <Controls
                    mediaType="tvshows"
                    addLabel="Add TV Show"
                    onAdd={() => navigate("/library/tvshows/new")}
                    clearFilters={clearFilters}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortKey={sortKey}
                    setSortKey={setSortKey}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                  />

                  {/* Status Summary */}
                  <div className="mb-4 rounded-xl bg-dark/70 p-4 text-light">
                    <div className="mb-2 text-lg font-semibold">
                      Status Summary
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Watched</div>
                        <div className="text-lg font-semibold">
                          {tvShowCounts.watched || 0}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">
                          Currently Watching
                        </div>
                        <div className="text-lg font-semibold">
                          {tvShowCounts.watching || 0}
                        </div>
                      </div>
                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">
                          Currently Rewatching
                        </div>
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
                        <div className="text-lg font-semibold">
                          {totalTVShowsAll}
                        </div>
                      </div>
                    </div>
                  </div>

                  <TVShowList
                    tvShows={filteredTVShows}
                    searchQuery={searchQuery}
                    onRowClick={(id) => navigate(`/library/tvshows/${id}`)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videogames">
              <Card className="bg-transparent border-transparent">
                <CardContent className="grid gap-6">
                  <Controls
                    mediaType="videogames"
                    addLabel="Add Video Game"
                    onAdd={() => navigate("/library/videogames/new")}
                    clearFilters={clearFilters}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortKey={sortKey}
                    setSortKey={setSortKey}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                  />

                  {/* Status Summary */}
                  <div className="mb-4 rounded-xl bg-dark/70 p-4 text-light">
                    <div className="mb-2 text-lg font-semibold">
                      Status Summary
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Completed</div>
                        <div className="text-lg font-semibold">
                          {videoGameCounts.completed || 0}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">
                          Currently Playing
                        </div>
                        <div className="text-lg font-semibold">
                          {videoGameCounts.playing || 0}
                        </div>
                      </div>

                                            <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">
                          Currently Replaying
                        </div>
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
                        <div className="text-lg font-semibold">
                          {totalVideoGamesAll}
                        </div>
                      </div>
                    </div>
                  </div>

                  <VideoGameList
                    videoGames={filteredVideoGames}
                    searchQuery={searchQuery}
                    onRowClick={(id) => navigate(`/library/videogames/${id}`)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
