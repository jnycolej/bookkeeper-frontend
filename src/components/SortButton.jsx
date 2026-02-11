// import React from "react";
// import api from "../services/api";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { drop } from "lodash";

// const SortButton = ({ handleSort, mediaType = "" }) => {
//   const BookSortOptions = () => {
//     return (
//       <div>
//         <DropdownMenuItem onClick={() => handleSort("author-asc")}>
//           Author (A - Z)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("author-desc")}>
//           Author (Z - A)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("title-asc")}>
//           Title (A - Z)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("title-desc")}>
//           Title (Z - A)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("year-asc")}>
//           Year (oldest to newest)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("year-desc")}>
//           Year (newest to oldest)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("page-asc")}>
//           Page Count (ascending)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("page-desc")}>
//           Page Count (descending)
//         </DropdownMenuItem>
//       </div>
//     );
//   };

//   const MovieSortOptions = () => {
//     return (
//       <div>
//         <DropdownMenuItem onClick={() => handleSort("director-asc")}>
//           Director (A - Z)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("director-desc")}>
//           Director (Z - A)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("title-asc")}>
//           Title (A - Z)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("title-desc")}>
//           Title (Z - A)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("year-asc")}>
//           Release Year (oldest to newest)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("year-desc")}>
//           Release Year (newest to oldest)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("duration-asc")}>
//           Duration (ascending)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("duration-desc")}>
//           Duration (descending)
//         </DropdownMenuItem>
//       </div>
//     );
//   };

//   const TVShowSortOptions = () => {
//     return (
//       <div>
//         <DropdownMenuItem onClick={() => handleSort("showCreator-asc")}>
//           Show Creator (A - Z)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("showCreator-desc")}>
//           Show Creator (Z - A)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("title-asc")}>
//           Title (A - Z)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("title-desc")}>
//           Title (Z - A)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("year-asc")}>
//           Release Year (oldest to newest)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("year-desc")}>
//           Release Year (newest to oldest)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("avgDuration-asc")}>
//           Avg Episode Duration (ascending)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("avgDuration-desc")}>
//           Avg Episode Duration (descending)
//         </DropdownMenuItem>
//       </div>
//     );
//   };

//   let DropDownOptions;

//   switch (mediaType) {
//     case "books":
//       DropDownOptions = BookSortOptions;
//       break;
//     case "movies":
//       DropDownOptions = MovieSortOptions;
//       break;
//     case "tvshows":
//       DropDownOptions = TVShowSortOptions;
//     default:
//       DropDownOptions = BookSortOptions;
//       break;
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className="w-full rounded-md bg-secondary px-4 py-2 font-semibold text-light hover:bg-secondary/90">
//           Sort
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         align="start"
//         className="w-56 bg-popover text-popover-foreground border border-border"
//       >
//         <DropDownOptions />
//         {/* <DropdownMenuItem onClick={() => handleSort("author-asc")}>
//           Author (A - Z)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("author-desc")}>
//           Author (Z - A)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("title-asc")}>
//           Title (A - Z)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("title-desc")}>
//           Title (Z - A)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("year-asc")}>
//           Year (oldest to newest)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("year-desc")}>
//           Year (newest to oldest)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("page-asc")}>
//           Page count (ascending)
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => handleSort("page-desc")}>
//           Page Count (descending)
//         </DropdownMenuItem> */}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default SortButton;
// src/features/library/components/SortButton.jsx
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SORT_OPTIONS_BY_MEDIA } from "@/features/library/config/filterConfig";

const SortButton = ({ value, onChange, mediaType = "books" }) => {
  const options = SORT_OPTIONS_BY_MEDIA[mediaType] ?? SORT_OPTIONS_BY_MEDIA.books;

  const label = value ? "Sort: " + (options.find(o => o.key === value)?.label ?? value) : "Sort";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="bk-btn-secondary w-full">
          {label}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72">
        {options.map((opt) => (
          <DropdownMenuItem key={opt.key} onClick={() => onChange(opt.key)}>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButton;