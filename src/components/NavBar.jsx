import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import LoginButton from "./LoginButton";
import BookKeeperLogo from "../assets/BookKeeperLogo.png";

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
      <nav className="flex flex-wrap items-center gap-2 px-4 py-3">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNav("/home")}
            className="flex items-center"
            aria-label="Go to home"
          >
            <img
              className="h-10 w-auto"
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
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => handleNav("/books")}
                className="text-dark hover:text-primary"
              >
                Library
              </button>
              <button
                type="button"
                onClick={() => handleNav("/bookform")}
                className="text-dark hover:text-primary"
              >
                Add Book
              </button>
              <button
                type="button"
                onClick={() => handleNav("/profile")}
                className="text-dark hover:text-primary"
              >
                Profile
              </button>
            </div>

              <LoginButton />
              <button
                className="bk-btn-secondary"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>

          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mx-auto w-full max-w-6xl md:hidden">
            <div className="mt-2 rounded-xl border border-secondary bg-light p-3">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleNav("/books")}
                  className="rounded-md px-3 py-2 text-left text-dark hover:bg-body hover:text-primary"
                >
                  Library
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("/bookform")}
                  className="rounded-md px-3 py-2 text-left text-dark hover:bg-body hover:text-primary"
                >
                  Add Book
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("/profile")}
                  className="rounded-md px-3 py-2 text-left text-dark hover:bg-body hover:text-primary"
                >
                  Profile
                </button>

                <div className="mt-2 flex items-center gap-2">
                  <LoginButton />
                  <button
                    className="bk-btn-secondary"
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
          </div>
        )}
      </nav>
    </header>
  );
}
