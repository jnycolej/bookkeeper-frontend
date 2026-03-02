import React from "react";
import { useNavigate } from "react-router-dom";
import { HighlightText } from "@/shared/components/HighlightText";
import { YesNoIcon } from "@/shared/components/YesNoIcon";
import { formatDate } from "@/utils/date";



export const BookRow = ({ book, idx, searchQuery, onRowClick, onDelete }) => {
  
    const navigation = useNavigate();

    return (
    <tr
      key={book._id}
      onClick={() => onRowClick(book._id)}
      className={[
        "cursor-pointer border-t border-secondary/40",
        idx % 2 === 0 ? "bg-secondary/5" : "bg-dark/5",
        "hover:bg-body",
      ].join(" ")}
    >
      <td className="px-3 py-2">
        <HighlightText text={book.title} query={searchQuery} />
      </td>

      <td className="px-3 py-2">
        <HighlightText text={book.series || ""} query={searchQuery} />
      </td>

      <td className="px-3 py-2">
        {book.seriesNum ? `# ${book.seriesNum}` : "N/A"}
      </td>

      <td className="px-3 py-2">
        <HighlightText
          text={(book.author || []).join(", ")}
          query={searchQuery}
        />
      </td>

      <td className="px-3 py-2">
        {(book.genres ? [...book.genres].sort() : []).join(", ")}
      </td>

      <td className="px-3 py-2">{book.publicationYear}</td>
      <td className="px-3 py-2">{book.pageCount}</td>
      <td className="px-3 py-2">
        {book.status == "currentlyReading" ? "currently reading" : book.status}
      </td>
      <td className="px-3 py-2">{formatDate(book.dateFinished)}</td>
      <td className="px-3 py-2">
        <YesNoIcon value={!!book.kindleUnlimited} />
      </td>
      <td className="px-3 py-2">
        <YesNoIcon value={!!book.libby} />
      </td>
      <td className="px-3 py-2">
        <button
          className="px-3 py-2 rounded-md border"
          onClick={(e) => {
            e.stopPropagation();
            navigation(`/library/books/${book._id}/edit`);
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
            onDelete(book);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
