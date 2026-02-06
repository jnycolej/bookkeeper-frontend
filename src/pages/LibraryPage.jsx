import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { LibraryControlCenter } from "@/features/library/components/LibraryControlCenter";
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
  const { videoGames, videoGamesCounts, videoGameDeleteById } = useGamesQuery();
  const { tvShows, tvShowsCounts, tvShowDeleteById } = useTVShowsQuery();
  // 2) view state (filters/search/sort)
  const {
    filteredBooks,
    searchQuery,
    setSearchQuery,
    setSelectedGenres,
    setSelectedStatuses,
    setSortKey,
    clearFilters,
  } = useLibraryFilters(books, movies, tvShows, videoGames);

  const totalUnread = (bookCounts.want || 0) + (bookCounts.owned || 0);
  const totalAll =
    (bookCounts.read || 0) +
    (bookCounts.currentlyReading || 0) +
    (bookCounts.want || 0) +
    (bookCounts.owned || 0);

  return (
    <div className="bookKeeper-library-background min-w-screen min-h-screen">
      <NavBar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <h1 className="mb-5 text-center text-4xl font-semibold">My Library</h1>

        {/* Status Summary */}
        {/* <div className="mb-4 rounded-xl bg-dark/70 p-4 text-light">
          <div className="mb-2 text-lg font-semibold">Status Summary</div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Read</div>
              <div className="text-lg font-semibold">{bookCounts.read || 0}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Reading</div>
              <div className="text-lg font-semibold">
                {bookCounts.currentlyReading || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Want</div>
              <div className="text-lg font-semibold">{bookCounts.want || 0}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Owned</div>
              <div className="text-lg font-semibold">{bookCounts.owned || 0}</div>
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
        </div> */}

        <div className="flex w-full max-w-7xl flex-col gap-6">
          <Tabs defaultValue="books">
            <TabsList className="place-content-center">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="tvshows">TV</TabsTrigger>
              <TabsTrigger value="games">Games</TabsTrigger>
            </TabsList>

            <TabsContent value="books">
              <Card className="bg-transparent border-transparent">
                <CardContent className="grid gap-6">
                  {/* Controls */}
                  <div className="mb-4 rounded-2xl w-3/4 bg-dark/70 p-4 text-light backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <button
                        type="button"
                        className="bk-btn-primary w-full"
                        onClick={() => navigate("/library/books/new")}
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
                        className="bk-btn-outline text-light w-full"
                        onClick={clearFilters}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
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
                          {totalUnread}
                        </div>
                      </div>

                      <div className="rounded-md bg-light/10 px-3 py-2">
                        <div className="text-xs opacity-80">Total</div>
                        <div className="text-lg font-semibold">{totalAll}</div>
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
                  <div className="mb-4 rounded-2xl bg-dark/70 p-4 text-light backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
                      <button
                        type="button"
                        className="bk-btn-primary w-full"
                        onClick={() => navigate("/library/movies/new")}
                      >
                        Add Movie
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
                        className="bk-btn-outline text-light w-full"
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
              <div className="text-xs opacity-80">Watched</div>
              <div className="text-lg font-semibold">{movieCounts.watched || 0}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Currently Reading</div>
              <div className="text-lg font-semibold">
                {movieCounts.watching || 0}
              </div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Want</div>
              <div className="text-lg font-semibold">{movieCounts.wantToWatch || 0}</div>
            </div>
{/* 
            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Owned</div>
              <div className="text-lg font-semibold">{bookCounts.owned || 0}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Total Unread</div>
              <div className="text-lg font-semibold">{totalUnread}</div>
            </div>

            <div className="rounded-md bg-light/10 px-3 py-2">
              <div className="text-xs opacity-80">Total</div>
              <div className="text-lg font-semibold">{totalAll}</div>
            </div> */}
          </div>
        </div>
                  <MovieList
                    movies={movies}
                    searchQuery={searchQuery}
                    onRowClick={(id) => navigate(`/library/movies/${id}`)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tvshows">
              <Card className="bg-transparent border-transparent">
                <CardContent className="grid gap-6">
                  <div className="mb-4 rounded-2xl bg-dark/70 p-4 text-light backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
                      <button
                        type="button"
                        className="bk-btn-primary w-full"
                        onClick={() => navigate("/library/tvshows/new")}
                      >
                        Add TV Show
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
                        className="bk-btn-outline text-light w-full"
                        onClick={clearFilters}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <TVShowList
                    tvShows={tvShows}
                    searchQuery={searchQuery}
                    onRowClick={(id) => navigate(`/library/tvshows/${id}`)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="games">
              <Card className="bg-transparent border-transparent">
                <CardContent className="grid gap-6">
                          <div className="mb-4 rounded-2xl bg-dark/70 p-4 text-light backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <button
              type="button"
              className="bk-btn-primary w-full"
              onClick={() => navigate("/library/videogames/new")}
            >
              Add Video Game
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
              className="bk-btn-outline text-light w-full"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>
                  <VideoGameList
                    videoGames={videoGames}
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
