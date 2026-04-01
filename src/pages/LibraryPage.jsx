import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Clapperboard, Tv, Book } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import NavBar from "../components/NavBar";
import BookList from "../components/BookList";
import MovieList from "../components/MovieList";
import TVShowList from "@/components/TVShowList";
import VideoGameList from "@/components/VideoGameList";

import { Controls } from "@/features/library/components/LibraryControlCenter";
import { StatusSummary } from "@/features/library/components/StatusSummaryCenter";
import { useBooksQuery } from "@/features/library/hooks/useBooksQuery";
import { useMoviesQuery } from "@/features/library/hooks/useMoviesQuery";
import { useGamesQuery } from "@/features/library/hooks/useGamesQuery";
import { useTVShowsQuery } from "@/features/library/hooks/useTVShowsQuery";

import { useLibraryFilters } from "@/features/library/hooks/useLibraryFilters";

const LibraryPage = () => {
  const navigate = useNavigate();

  // data
  const { books, deleteById } = useBooksQuery();
  const { movies, movieDeleteById } = useMoviesQuery();
  const { videoGames, videoGameDeleteById } = useGamesQuery();
  const { tvShows, tvShowDeleteById } = useTVShowsQuery();
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
  } = useLibraryFilters({ books, movies, tvShows, videoGames });

  return (
    <div className="bookKeeper-library-background mx-auto min-h-screen w-full overflow-x-hidden">
      <NavBar />

      <div className="mx-auto w-full max-w-7xl py-6">
        <h1 className="mb-5 mx-auto text-center text-6xl font-semibold">
          My Library
        </h1>

        <div className="flex mx-auto w-full max-w-7xl flex-col gap-6">
          <Tabs
            value={activeTab}
            className="mx-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto bg-red-900/40 px-2">
              <TabsTrigger className="shrink-0 gap-2 text-base sm:text-2xl" value="books">
                <Book /> Books
              </TabsTrigger>
              <TabsTrigger className="shrink-0 gap-2 text-base sm:text-2xl" value="movies">
                <Clapperboard /> Movies
              </TabsTrigger>
              <TabsTrigger className="shrink-0 gap-2 text-base sm:text-2xl" value="tvshows">
                <Tv /> TV
              </TabsTrigger>
              <TabsTrigger className="shrink-0 gap-2 text-base sm:text-2xl" value="videogames">
                <Gamepad2 /> Games
              </TabsTrigger>
            </TabsList>

            <TabsContent value="books">
              <Card className="bg-transparent border-transparent">
                <CardContent className="p-0">
                  {/* Controls */}
                  <div className="mx-auto w-full max-w-6xl grid gap-6">
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
                  </div>

                  {/* Status Summary */}
                  <StatusSummary mediaType="books" />
                  <div className="w-full overflow-x-auto">
                    <BookList
                      books={filteredBooks}
                      searchQuery={searchQuery}
                      onRowClick={(id) => navigate(`/library/books/${id}`)}
                      onDelete={deleteById}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="movies">
              <Card className="bg-transparent border-transparent">
                <CardContent className="p-0">
                  <div className="mx-auto w-full max-w-6xl grid gap-6">
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
                    <StatusSummary mediaType="movies" />
                  </div>
                  <div className="w-full overflow-x-auto">
                    <MovieList
                      movies={filteredMovies}
                      searchQuery={searchQuery}
                      onRowClick={(id) => navigate(`/library/movies/${id}`)}
                      onDelete={movieDeleteById}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tvshows">
              <Card className="bg-transparent border-transparent">
                <CardContent className="mx-auto w-full max-w-6xl grid gap-6">
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
                  <StatusSummary mediaType="tvshows" />
                  <div className="w-full overflow-x-auto">
                    <TVShowList
                      tvShows={filteredTVShows}
                      searchQuery={searchQuery}
                      onRowClick={(id) => navigate(`/library/tvshows/${id}`)}
                      onDelete={tvShowDeleteById}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videogames">
              <Card className="bg-transparent border-transparent">
                <CardContent className="mx-auto w-full max-w-6xl grid gap-6">
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
                  <StatusSummary mediaType="videogames" />
                  <div className="w-full overflow-x-auto">
                    <VideoGameList
                      videoGames={filteredVideoGames}
                      searchQuery={searchQuery}
                      onRowClick={(id) => navigate(`/library/videogames/${id}`)}
                      onDelete={videoGameDeleteById}
                    />
                  </div>
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
