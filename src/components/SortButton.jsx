import React from "react";
import api from "../services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SortButton = ({ handleSort }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full rounded-md bg-secondary px-4 py-2 font-semibold text-light hover:bg-secondary/90">
          Sort
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 bg-popover text-popover-foreground border border-border"
      >
        <DropdownMenuItem onClick={() => handleSort("author-asc")}>
          Author (A - Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("author-desc")}>
          Author (Z - A)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("title-asc")}>
          Title (A - Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("title-desc")}>
          Title (Z - A)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("year-asc")}>
          Year (oldest to newest)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("year-desc")}>
          Year (newest to oldest)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("page-asc")}>
          Page count (ascending)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("page-desc")}>
          Page Count (descending)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButton;
