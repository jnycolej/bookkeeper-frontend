// src/features/library/components/GenreFilter.jsx
import React, { useMemo, useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GenreFilter = ({ value = [], onChange, mediaType = "books" }) => {
  const [genres, setGenres] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await api.get(`/library/${mediaType}/genres`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGenres(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error fetching genres:", e);
        setGenres([]);
      }
    };

    fetchGenres();
  }, [getAccessTokenSilently, mediaType]);

  const toggle = (g) => {
    const next = value.includes(g) ? value.filter((x) => x !== g) : [...value, g];
    onChange(next);
  };

  const clear = () => onChange([]);

  const label = useMemo(() => {
    if (value.length === 0) return "Genre Filter";
    if (value.length === 1) return `Genre: ${value[0]}`;
    return `Genres (${value.length})`;
  }, [value]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="bg-primary p-2 rounded-xl text-xl font-semibold">
          {label}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="text-sm">Filter by genre</DropdownMenuLabel>
          <button type="button" onClick={clear} className="text-sm text-primary hover:opacity-80">
            Clear
          </button>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-56 overflow-auto px-2 py-2">
          {genres.length === 0 ? (
            <div className="px-2 py-2 text-sm text-text/70">No genres found</div>
          ) : (
            <div className="space-y-2">
              {genres.map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="bk-checkbox"
                    checked={value.includes(g)}
                    onChange={() => toggle(g)}
                  />
                  <span className="text-sm capitalize">{g}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenreFilter;