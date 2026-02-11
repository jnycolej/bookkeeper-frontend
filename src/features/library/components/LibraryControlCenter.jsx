import GenreFilter from "@/components/GenreFilter";
import StatusFilter from "@/components/StatusFilter";
import SearchBar from "@/components/SearchBar";
import SortButton from "@/components/SortButton";

export const Controls = ({
  mediaType,
  addLabel,
  onAdd,
  clearFilters,
  searchQuery,
  setSearchQuery,
  sortKey,
  setSortKey,
  selectedGenres,
  setSelectedGenres,
  selectedStatuses,
  setSelectedStatuses,
}) => {
  return (
    <div className="mb-4 rounded-2xl bg-dark/70 p-4 text-light backdrop-blur-sm">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <button type="button" className="bk-btn-primary w-full" onClick={onAdd}>
          {addLabel}
        </button>

        <SortButton
          mediaType={mediaType}
          value={sortKey}
          onChange={setSortKey}
        />
        <GenreFilter
          mediaType={mediaType}
          value={selectedGenres}
          onChange={setSelectedGenres}
        />
        <StatusFilter
          mediaType={mediaType}
          value={selectedStatuses}
          onChange={setSelectedStatuses}
        />

        <div className="lg:col-span-2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <button
          type="button"
          className="bk-btn-outline text-light w-full"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

// export const StatusSummary = ({ counts }) => {
//   return (
//     <div className="mb-4 rounded-xl bg-dark/70 p-4 text-light">
//       <div className="mb-2 text-lg font-semibold">Status Summary</div>

//       <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
//         <div className="rounded-md bg-light/10 px-3 py-2">
//           <div className="text-xs opacity-80">Watched</div>
//           <div className="text-lg font-semibold">
//             {movieCounts.watched || 0}
//           </div>
//         </div>

//         <div className="rounded-md bg-light/10 px-3 py-2">
//           <div className="text-xs opacity-80">Currently Watching</div>
//           <div className="text-lg font-semibold">
//             {movieCounts.watching || 0}
//           </div>
//         </div>

//         <div className="rounded-md bg-light/10 px-3 py-2">
//           <div className="text-xs opacity-80">Want to Watch</div>
//           <div className="text-lg font-semibold">
//             {movieCounts.wantToWatch || 0}
//           </div>
//         </div>

//         <div className="rounded-md bg-light/10 px-3 py-2">
//           <div className="text-xs opacity-80">Total</div>
//           <div className="text-lg font-semibold">{totalMoviesAll}</div>
//         </div>
//       </div>
//     </div>
//   );
// };
