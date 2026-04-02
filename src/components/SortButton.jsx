import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SORT_OPTIONS_BY_MEDIA } from "@/features/library/config/filterConfig";

const SortButton = ({ value, onChange, mediaType = "books" }) => {
  const options =
    SORT_OPTIONS_BY_MEDIA[mediaType] ?? SORT_OPTIONS_BY_MEDIA.books;

  const label = value
    ? "Sort: " + (options.find((o) => o.key === value)?.label ?? value)
    : "Sort";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="bg-primary p-2 rounded-xl text-xl font-semibold"
        >
          {label}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-50 bg-stone-50/90 h-30">
        {value && (
          <>
            <DropdownMenuItem onClick={() => onChange(null)}>
              Clear Sort
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={value === opt.key ? "bg-primary/20" : ""}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButton;
