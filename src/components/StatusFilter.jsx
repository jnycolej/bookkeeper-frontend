import React, { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import { useAuth0 } from "@auth0/auth0-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OPTIONS = [
  { value: "read", label: "Read" },
  { value: "currentlyReading", label: "Currently Reading" },
  { value: "want", label: "Want" },
  { value: "owned", label: "Owned" },
  { value: "unread", label: "Unread" }, // fixed label
];
const StatusFilter = ({ handleFilter }) => {
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const handleCheckBoxChange = (statusValue) => {
    let updated = selectedStatus.includes(statusValue)
      ? selectedStatus.filter((item) => item !== statusValue)
      : [...selectedStatus, statusValue];
    setSelectedStatus(updated);
    handleFilter(updated);
  };

    const toggle = (value) => {
    const updated = selectedStatus.includes(value)
      ? selectedStatus.filter((v) => v !== value)
      : [...selectedStatus, value];

    setSelectedStatus(updated);
    handleFilter(updated);
  };

  const clear = () => {
    setSelectedStatus([]);
    handleFilter([]);
  };

  const label = useMemo(() => {
    if (selectedStatus.length === 0) return "Status Filter";
    if (selectedStatus.length === 1) {
      const one = OPTIONS.find((o) => o.value === selectedStatus[0])?.label;
      return `Status: ${one ?? selectedStatus[0]}`;
    }
    return `Statuses (${selectedStatus.length})`;
  }, [selectedStatus]);

  return (
<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="bk-btn-secondary w-full">
          {label}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="text-sm">Filter by status</DropdownMenuLabel>

          <button
            type="button"
            onClick={clear}
            className="text-sm text-primary hover:opacity-80"
          >
            Clear
          </button>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-56 overflow-auto px-2 py-2">
          <div className="space-y-2">
            {OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="bk-checkbox"
                  checked={selectedStatus.includes(opt.value)}
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
