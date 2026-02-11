// src/features/library/config/filterConfig.js

export const STATUS_OPTIONS_BY_MEDIA = {
  books: [
    { value: "read", label: "Read" },
    { value: "currentlyReading", label: "Currently Reading" },
    { value: "want", label: "Want" },
    { value: "owned", label: "Owned" },
    { value: "unread", label: "Unread" },
  ],
  movies: [
    { value: "watched", label: "Watched" },
    { value: "wantToWatch", label: "Want to Watch" },
    { value: "watching", label: "Watching" },
    { value: "owned", label: "Owned" },
  ],
  tvshows: [
    { value: "watched", label: "Watched" },
    { value: "watching", label: "Watching" },
    { value: "wantToWatch", label: "Want to Watch" },
  ],
  videogames: [
    { value: "completed", label: "Completed" },
    { value: "playing", label: "Playing" },
    { value: "wantToPlay", label: "Want to Play" },
    { value: "owned", label: "Owned" },
  ],
};

export const SORT_OPTIONS_BY_MEDIA = {
  books: [
    { key: "author-asc", label: "Author (A - Z)" },
    { key: "author-desc", label: "Author (Z - A)" },
    { key: "title-asc", label: "Title (A - Z)" },
    { key: "title-desc", label: "Title (Z - A)" },
    { key: "year-asc", label: "Year (oldest to newest)" },
    { key: "year-desc", label: "Year (newest to oldest)" },
    { key: "page-asc", label: "Page Count (ascending)" },
    { key: "page-desc", label: "Page Count (descending)" },
  ],
  movies: [
    { key: "director-asc", label: "Director (A - Z)" },
    { key: "director-desc", label: "Director (Z - A)" },
    { key: "title-asc", label: "Title (A - Z)" },
    { key: "title-desc", label: "Title (Z - A)" },
    { key: "year-asc", label: "Release Year (oldest to newest)" },
    { key: "year-desc", label: "Release Year (newest to oldest)" },
    { key: "duration-asc", label: "Duration (ascending)" },
    { key: "duration-desc", label: "Duration (descending)" },
  ],
  tvshows: [
    { key: "showCreator-asc", label: "Show Creator (A - Z)" },
    { key: "showCreator-desc", label: "Show Creator (Z - A)" },
    { key: "title-asc", label: "Title (A - Z)" },
    { key: "title-desc", label: "Title (Z - A)" },
    { key: "year-asc", label: "Release Year (oldest to newest)" },
    { key: "year-desc", label: "Release Year (newest to oldest)" },
    { key: "avgDuration-asc", label: "Avg Episode Duration (ascending)" },
    { key: "avgDuration-desc", label: "Avg Episode Duration (descending)" },
  ],
  videogames: [
    { key: "title-asc", label: "Title (A - Z)" },
    { key: "title-desc", label: "Title (Z - A)" },
    { key: "year-asc", label: "Release Year (oldest to newest)" },
    { key: "year-desc", label: "Release Year (newest to oldest)" },
  ],
};