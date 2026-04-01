import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import LoginButton from "./LoginButton";
import BookKeeperLogo from "../assets/BookKeeperLogo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [open, setOpen] = useState(false);

  const handleNav = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="w-full">
      <nav className="flex items-center bg-red-900/40 gap-4 px-4 py-3">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNav("/home")}
            className="flex items-center"
            aria-label="Go to home"
          >
            <img
              className="h-20 w-auto"
              src={BookKeeperLogo}
              alt="BookKeeper"
            />
          </button>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-secondary px-3 py-2 text-dark md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* simple hamburger */}
            <span className="block h-0.5 w-5 bg-dark" />
            <span className="mt-1 block h-0.5 w-5 bg-dark" />
            <span className="mt-1 block h-0.5 w-5 bg-dark" />
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuItem
                      asChild
                      className="{navigationMenuTriggerStyle()}"
                    >
                      <a
                        className="text-stone-50 mx-4 text-2xl font-semibold tracking-wide"
                        href="/library"
                      >
                        Library
                      </a>
                    </NavigationMenuItem>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-xl text-stone-50">Add</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-50">
                        <li>
                          <a onClick={() => handleNav("/library/books/new")}>
                            Book
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleNav("/library/movies/new")}>
                            Movie
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleNav("/library/tvshows/new")}>
                            TV Show
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => handleNav("/library/videogames/new")}
                          >
                            Video Game
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button
                      type="button"
                      onClick={() => handleNav("/profile")}
                      className="text-stone-50 text-xl px-3 py-2 rounded-xl mx-4 hover:text-stone-50 hover:bg-primary/60"
                    >
                      Profile
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <LoginButton />
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button
                      className="bg-red-900/70 font-bold text-stone-50 hover:bg-stone-50 hover:text-red-600 py-2 px-4 mx-4 rounded-xl"
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                    >
                      Log Out
                    </button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mx-auto w-full max-w-6xl md:hidden">
            <div className="mt-2 rounded-xl border border-secondary bg-light p-3">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleNav("/library")}
                  className="rounded-md px-3 py-2 text-left text-dark hover:bg-body hover:text-primary"
                >
                  Library
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("/library/books/new")}
                  className="rounded-md px-3 py-2 text-left text-dark hover:bg-body hover:text-primary"
                >
                  Add Book
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("/library/movies/new")}
                  className="rounded-md px-3 py-2 text-left text-dark hover:bg-body hover:text-primary"
                >
                  Add Movie
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("/library/tvshows/new")}
                  className="rounded-md px-3 py-2 text-left text-dark hover:bg-body hover:text-primary"
                >
                  Add TV Show
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("/library/videogames/new")}
                  className="rounded-md px-3 py-2 text-left text-dark hover:bg-body hover:text-primary"
                >
                  Add Video Game
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("/profile")}
                  className="rounded-md px-3 py-2 text-left !text-stone-950 hover:bg-body hover:text-primary"
                >
                  Profile
                </button>

                <LoginButton />
                <button
                  className="!font-bold"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
