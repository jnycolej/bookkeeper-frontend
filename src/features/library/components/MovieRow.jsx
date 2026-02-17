import React from "react";
import { useNavigate } from "react-router-dom";
import { HighlightText } from "@/shared/components/HighlightText";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { YesNoIcon } from "@/shared/components/YesNoIcon";
import { formatDate } from "@/utils/date";

export const MovieRow = ({ movie, idx, searchQuery, onRowClick, onDelete }) => {
  const navigation = useNavigate();

  const toDisplayList = (val) => {
    if (!val) return "";
    if (Array.isArray(val)) return val.join(" | ");
    // if you store "Name1; Name2" in DB:
    return String(val)
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(", ");
  };
  return (
    <tr
      key={movie._id}
      onClick={() => onRowClick(movie._id)}
      className={[
        "cursor-pointer border-t border-secondary/40",
        idx % 2 === 0 ? "bg-secondary/5" : "bg-dark/5",
        "hover:bg-body",
      ].join(" ")}
    >
      <td className="px-3 py-2">
        <HighlightText text={movie.title} query={searchQuery} />
      </td>
      <td className="px-3 py-2">
        <HighlightText
          text={(movie.director || []).join(" | ")}
          query={searchQuery}
        />
      </td>
      <td className="px-3 py-2">
        <ScrollArea className="h-20">
        <HighlightText
          text={toDisplayList(movie.actors || " ")}
          query={searchQuery}
        />          
        </ScrollArea>

      </td>

      <td className="px-3 py-2">{movie.releaseYear}</td>
      <td className="px-3 py-2">{movie.duration}min</td>
      <td className="px-3 py-2">{(movie.genres || []).join(" | ")}</td>
      <td className="px-3 py-2">{movie.studio}</td>
      <td className="px-3 py-2">
        <HighlightText
          text={toDisplayList(movie.series || "")}
          query={searchQuery}
        />
      </td>

      <td className="px-3 py-2">
        {movie.seriesNum ? `# ${movie.seriesNum}` : "N/A"}
      </td>

      <td className="px-3 py-2">{movie.status == movie.status}</td>
      <td className="px-3 py-2">
        <button
          type="button"
          className="px-3 py-2 rounded-md border"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(movie);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
