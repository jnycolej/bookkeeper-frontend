// import React, { useEffect, useState, useMemo } from "react";
// import api from "../services/api";
// import { useAuth0 } from "@auth0/auth0-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const BOOK_OPTIONS = [
//   { value: "read", label: "Read" },
//   { value: "currentlyReading", label: "Currently Reading" },
//   { value: "want", label: "Want" },
//   { value: "owned", label: "Owned" },
//   { value: "unread", label: "Unread" }, 
// ];

// const VIDEO_GAME_OPTIONS = [
//   { value: "completed", label: "Completed"},
//   { value: "playing", label: "Playing"},
//   { value: "wantToPlay", label: "Want to Play"},
//   { value: "owned", label: "Owned"}
// ]

// const TV_OPTIONS = [
//   { value: "watched", label: "Watched"},
//   { value: "watching", label: "Watching"},
//   { value: "wantToWatch", label: "Want to Watch"}
// ]

// const MOVIE_OPTIONS = [
//     { value: "watched", label: "Watched"},
//     { value: "wantToWatch", label: "Want to Watch"},
//     { value: "watching", label: "Watching"},
//     { value: "owned", label: "Owned"}
// ]

// const StatusFilter = ({ handleFilter, mediaType="" }) => {
//   const [status, setStatus] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState([]);
//   const { getAccessTokenSilently } = useAuth0();
//   let chosenOptions;

//   switch(mediaType) {
//     case "books":
//         chosenOptions = BOOK_OPTIONS;
//         break;
//     case "movies":
//         chosenOptions = MOVIE_OPTIONS;
//         break;
//     case "tvshows":
//       chosenOptions = TV_OPTIONS;
//       break;
//     case "videogames":
//       chosenOptions = VIDEO_GAME_OPTIONS;
//       break;
//     default:
//       chosenOptions = BOOK_OPTIONS;
//       break;
//   }

//   const handleCheckBoxChange = (statusValue) => {
//     let updated = selectedStatus.includes(statusValue)
//       ? selectedStatus.filter((item) => item !== statusValue)
//       : [...selectedStatus, statusValue];
//     setSelectedStatus(updated);
//     handleFilter(updated);
//   };

//     const toggle = (value) => {
//     const updated = selectedStatus.includes(value)
//       ? selectedStatus.filter((v) => v !== value)
//       : [...selectedStatus, value];

//     setSelectedStatus(updated);
//     handleFilter(updated);
//   };

//   const clear = () => {
//     setSelectedStatus([]);
//     handleFilter([]);
//   };

//   const label = useMemo(() => {
//     if (selectedStatus.length === 0) return "Status Filter";
//     if (selectedStatus.length === 1) {
//       const one = chosenOptions.find((o) => o.value === selectedStatus[0])?.label;
//       return `Status: ${one ?? selectedStatus[0]}`;
//     }
//     return `Statuses (${selectedStatus.length})`;
//   }, [selectedStatus]);

//   return (
// <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button type="button" className="bk-btn-secondary w-full">
//           {label}
//         </button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="start" className="w-72">
//         <div className="flex items-center justify-between px-2 py-1.5">
//           <DropdownMenuLabel className="text-sm">Filter by status</DropdownMenuLabel>

//           <button
//             type="button"
//             onClick={clear}
//             className="text-sm text-primary hover:opacity-80"
//           >
//             Clear
//           </button>
//         </div>

//         <DropdownMenuSeparator />

//         <div className="max-h-56 overflow-auto px-2 py-2">
//           <div className="space-y-2">
//             {chosenOptions.map((opt) => (
//               <label key={opt.value} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="bk-checkbox"
//                   checked={selectedStatus.includes(opt.value)}
//                   onChange={() => toggle(opt.value)}
//                 />
//                 <span className="text-sm">{opt.label}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default StatusFilter;

// src/features/library/components/StatusFilter.jsx
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
        <button type="button" className="bk-btn-secondary w-full">
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