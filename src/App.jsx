// Root component
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";

import Profile from "./pages/Profile";
import ProfileForm from "./components/ProfileForm";

import BookDetails from "./pages/BookDetails";
import BookForm from "./components/BookForm";
import BookEditForm from "./components/BookEditForm";

import MovieForm from "./components/MovieForm";
import MovieDetails from "./pages/MovieDetails";
import MovieEditForm from "./components/MovieEditForm";

import TVShowForm from "./components/TVShowForm";
import TVShowDetails from "./pages/TVShowDetails";
import TVShowEditForm from "./components/TVShowEditForm";

import VideoGameForm from "./components/VideoGameForm";
import VideoGameDetails from "./pages/VideoGameDetails";
import VideoGameEditForm from "./components/VideoGameEditForm";

// Create a router using createBrowserRouter and set up the routes to pages and components
const router = createBrowserRouter(
  [
    { path: "/", element: <LoginPage /> },
    { path: "/home", element: <HomePage /> },
    { path: "/library", element: <LibraryPage /> },

    //Book Routes
    { path: "/library/books/new", element: <BookForm /> },
    { path: "/library/books/:id", element: <BookDetails /> },
    { path: "/books/:id", element: <BookDetails />},
    { path: "/library/books/:id/edit", element: <BookEditForm /> },

    //Movie Routes
    { path: "/library/movies/new", element: <MovieForm /> },
    { path: "/library/movies/:id", element: <MovieDetails /> },
    { path: "/library/movies/:id/edit", element: <MovieEditForm /> },

    //TV Routes
    { path: "/library/tvshows/new", element: <TVShowForm /> },
    { path: "/library/tvshows/:id", element: <TVShowDetails /> },
    { path: "/library/tvshows/:id/edit", element: <TVShowEditForm /> },

    //Video game routes
    { path: "/library/videogames/new", element: <VideoGameForm /> },
    { path: "/library/videogames/:id", element: <VideoGameDetails /> },
    { path: "/library/videogames/:id/edit", element: <VideoGameEditForm /> },

    //Profile Routes
    { path: "/profile", element: <Profile /> },
    { path: "/profileform", element: <ProfileForm /> },
  ],
  {
    future: {
      v7_startTransition: true, // Opt-in for React v7 startTransition behavior
      v7_relativeSplatPath: true, // Opt-in for the new relative route resolution behavior for splat routes
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

// Use RouterProvider to provide the router configuration to the app
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
