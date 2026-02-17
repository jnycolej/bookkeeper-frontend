import React from "react";
import { useNavigate } from "react-router-dom";
import { HighlightText } from "@/shared/components/HighlightText";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { YesNoIcon } from "@/shared/components/YesNoIcon";
import { formatDate } from "@/utils/date";

export const TVShowRow = ({
  tvShow,
  idx,
  searchQuery,
  onRowClick,
  onDelete,
}) => {
  const navigation = useNavigate();
  // helpers
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
      key={tvShow._id}
      onClick={() => onRowClick(tvShow._id)}
      className={[
        "cursor-pointer border-t border-secondary/40",
        idx % 2 === 0 ? "bg-secondary/5" : "bg-dark/5",
        "hover:bg-body",
      ].join(" ")}
    >
      <td className="px-3 py-2">
        <HighlightText text={tvShow.title} query={searchQuery} />
      </td>
      <td className="px-3 py-2">
        <HighlightText
          text={toDisplayList(tvShow.creator)}
          query={searchQuery}
        />
      </td>
      <td className="px-3 py-2">
        <ScrollArea className="h-20">
          <HighlightText
            text={toDisplayList(tvShow.actors || "")}
            query={searchQuery}
          />
        </ScrollArea>
      </td>
      <td className="px-3 py-2">
        {" "}
        {new Date(tvShow.startDate).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        })}
      </td>
      <td className="px-3 py-2">{tvShow.seasons}</td>
      <td className="px-3 py-2">
        <ScrollArea className="h-20">
          <HighlightText
            text={toDisplayList(tvShow.genres ?? tvShow.genre)}
            query={searchQuery}
          />
        </ScrollArea>
      </td>{" "}
      <td className="px-3 py-2">{tvShow.network}</td>
      <td className="px-3 py-2">{tvShow.status}</td>
      <td className="px-3 py-2">
        <button
          type="button"
          className="px-3 py-2 rounded-md border"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(tvShow);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
