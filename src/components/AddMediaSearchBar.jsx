import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Field } from "./ui/field";
import { Button } from "./ui/button";

import {
  searchGoogleBooks,
  searchMovies,
  searchTv,
  searchGames,
  fetchDetails,
} from "@/services/mediaSearchService";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p";
const POSTER_SIZE = "w342";

export default function AddMediaSearchBar({
  mediaType,
  onSelect,
  getAccessTokenSilently,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [searchBy, setSearchBy] = useState("title");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  async function runSearch() {
    if (!inputValue.trim()) {
      setError("Please enter a search");
      setResults([]);
      return;
    }

    setIsSearching(true);
    setError("");

    try {
      let items = [];

      if (mediaType === "book") {
        items = await searchGoogleBooks(inputValue, searchBy);
      } else if (mediaType === "movie") {
        items = await searchMovies(inputValue, getAccessTokenSilently);
      } else if (mediaType === "tv") {
        items = await searchTv(inputValue, getAccessTokenSilently);
      } else if (mediaType === "videogame") {
        items = await searchGames(inputValue, getAccessTokenSilently);
      }

      setResults(items);
    } catch (err) {
      console.error(`${mediaType} search failed`, err);
      setError("Search failed.");
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleSelect(item) {
    try {
      const detailedItem = await fetchDetails(
        item,
        mediaType,
        getAccessTokenSilently
      );
      onSelect(detailedItem);
      setIsOpen(false);
    } catch (err) {
      console.error(`Failed to fetch ${mediaType} details`, err);
      setError("Failed to fetch details.");
    }
  }

  function renderResult(item) {
    if (mediaType === "book") {
      const identifiers = item.volumeInfo?.industryIdentifiers || [];
      const isbn13 =
        identifiers.find((id) => id.type === "ISBN_13")?.identifier;
      const isbn10 =
        identifiers.find((id) => id.type === "ISBN_10")?.identifier;

      const googleImage = item.volumeInfo?.imageLinks?.thumbnail
        ?.replace("http://", "https://")
        ?.replace("zoom=1", "zoom=2");

      const openLibraryImage =
        isbn13 || isbn10
          ? `https://covers.openlibrary.org/b/isbn/${isbn13 || isbn10}-M.jpg?default=false`
          : null;

      const image = googleImage || openLibraryImage;

      return (
        <div key={item.id} className="border rounded p-3 flex gap-3">
          {image && (
            <img
              src={image}
              alt={item.volumeInfo?.title || "Book cover"}
              className="w-16 h-24 object-cover rounded"
            />
          )}
          <div className="flex flex-col flex-1">
            <p className="font-semibold">
              {item.volumeInfo?.title || "Untitled"}
            </p>
            <p className="text-sm">
              {item.volumeInfo?.authors?.join(", ") || "Unknown author"}
            </p>
            <Button type="button" onClick={() => handleSelect(item)}>
              Use This
            </Button>
          </div>
        </div>
      );
    }

    if (mediaType === "movie") {
      const image = item.poster_path
        ? `${TMDB_IMG_BASE}/${POSTER_SIZE}${item.poster_path}`
        : null;

      return (
        <div key={item.id} className="border rounded p-3 flex gap-3">
          {image && (
            <img
              src={image}
              alt={item.title || "Movie poster"}
              className="w-16 h-24 object-cover rounded"
            />
          )}
          <div className="flex flex-col flex-1">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm">
              {item.release_date?.slice(0, 4) || "Unknown year"}
            </p>
            <Button type="button" onClick={() => handleSelect(item)}>
              Use This
            </Button>
          </div>
        </div>
      );
    }

    if (mediaType === "tv") {
      const image = item.poster_path
        ? `${TMDB_IMG_BASE}/${POSTER_SIZE}${item.poster_path}`
        : null;

      return (
        <div key={item.id} className="border rounded p-3 flex gap-3">
          {image && (
            <img
              src={image}
              alt={item.name || "TV poster"}
              className="w-16 h-24 object-cover rounded"
            />
          )}
          <div className="flex flex-col flex-1">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm">
              {item.first_air_date?.slice(0, 4) || "Unknown year"}
            </p>
            <Button type="button" onClick={() => handleSelect(item)}>
              Use This
            </Button>
          </div>
        </div>
      );
    }

    if (mediaType === "videogame") {
      const image = item.cover?.url
        ? `https:${item.cover.url.replace("t_thumb", "t_cover_big")}`
        : null;

      return (
        <div key={item.id} className="border rounded p-3 flex gap-3">
          {image && (
            <img
              src={image}
              alt={item.name || "Game cover"}
              className="w-16 h-24 object-cover rounded"
            />
          )}
          <div className="flex flex-col flex-1">
            <p className="font-semibold">{item.name}</p>
            <Button type="button" onClick={() => handleSelect(item)}>
              Use This
            </Button>
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="flex justify-center my-2">
      <Button type="button" onClick={() => setIsOpen(true)}>
        Search for {mediaType}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full space-y-4 border bg-white rounded-xl p-8">
            <DialogTitle className="font-bold">
              Search for {mediaType} to Add
            </DialogTitle>

            <Description>
              Search for the {mediaType} you want to add to populate the form.
            </Description>

            {mediaType === "book" && (
              <div>
                <Label className="text-xl">Search By:</Label>
                <RadioGroup
                  defaultValue="title"
                  className="mb-2"
                  onValueChange={setSearchBy}
                >
                  <div>
                    <RadioGroupItem value="title" id="title" />
                    <Label htmlFor="title" className="text-lg pl-2">
                      Title
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="author" id="author" />
                    <Label htmlFor="author" className="text-lg pl-2">
                      Author
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <Field orientation="horizontal">
              <Input
                id="search-bar"
                type="text"
                value={inputValue}
                onChange={onChange}
                placeholder={`Search for ${mediaType}...`}
              />
              <Button
                type="button"
                onClick={runSearch}
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </Field>

            <div className="h-60 mt-5 overflow-y-scroll space-y-2">
              {error && <p>{error}</p>}
              {!error && results.length === 0 && !isSearching && (
                <p>No results yet.</p>
              )}
              {results.map(renderResult)}
            </div>

            <div className="flex gap-4">
              <Button type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}