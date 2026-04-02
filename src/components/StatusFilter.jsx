import React, { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATUS_OPTIONS_BY_MEDIA } from "@/features/library/config/filterConfig";

const StatusFilter = ({ value = [], onChange, mediaType = "books" }) => {
  const options = STATUS_OPTIONS_BY_MEDIA[mediaType] ?? STATUS_OPTIONS_BY_MEDIA.books;

  const toggle = (v) => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange(next);
  };

  const clear = () => onChange([]);

  const label = useMemo(() => {
    if (value.length === 0) return "Status Filter";
    if (value.length === 1) {
      const one = options.find((o) => o.value === value[0])?.label;
      return `Status: ${one ?? value[0]}`;
    }
    return `Statuses (${value.length})`;
  }, [value, options]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="bg-primary p-2 rounded-xl text-xl font-semibold">
          {label}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="text-sm">Filter by status</DropdownMenuLabel>
          <button type="button" onClick={clear} className="text-sm text-primary hover:opacity-80">
            Clear
          </button>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-56 overflow-auto px-2 py-2">
          <div className="space-y-2">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="bk-checkbox"
                  checked={value.includes(opt.value)}
                  onChange={() => toggle(opt.value)}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusFilter;