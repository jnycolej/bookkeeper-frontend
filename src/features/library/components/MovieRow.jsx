import React from "react";
import { useNavigate } from "react-router-dom";
import { HighlightText } from "@/shared/components/HighlightText";
import { YesNoIcon } from "@/shared/components/YesNoIcon";
import { formatDate } from "@/utils/date";



export const MovieRow = ({ movie, idx, searchQuery, onRowClick, onDelete }) => {
  
    const navigation = useNavigate();

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
        <HighlightText text={movie.series || ""} query={searchQuery} />
      </td>

      <td className="px-3 py-2">
        {movie.seriesNum ? `# ${movie.seriesNum}` : "N/A"}
      </td>

      <td className="px-3 py-2">
        <HighlightText
          text={(movie.author || []).join(", ")}
          query={searchQuery}
        />
      </td>

      <td className="px-3 py-2">
        {(movie.genres ? [...movie.genres].sort() : []).join(", ")}
      </td>

      <td className="px-3 py-2">{movie.publicationYear}</td>
      <td className="px-3 py-2">{movie.pageCount}</td>
      <td className="px-3 py-2">
        {movie.status == "currentlyReading" ? "currently reading" : movie.status}
      </td>
      <td className="px-3 py-2">{formatDate(movie.dateFinished)}</td>
      <td className="px-3 py-2">
        <YesNoIcon value={!!movie.kindleUnlimited} />
      </td>
      <td className="px-3 py-2">
        <YesNoIcon value={!!movie.libby} />
      </td>
      <td className="px-3 py-2">
        <button
          className="px-3 py-2 rounded-md border"
          onClick={(e) => {
            e.stopPropagation();
            navigation(`/library/movies/${movie._id}/edit`);
          }}
        >
          Edit
        </button>
      </td>
      <td className="px-3 py-2">
        <button
          type="button"
          className="px-3 py-2 rounded-md bg-red-900 text-white border"
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
