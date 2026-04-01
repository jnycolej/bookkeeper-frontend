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
    <div className="mb-4 mx-auto w-full max-w-5xl rounded-2xl bg-dark/70 p-4 text-light backdrop-blur-sm">
      <div className="grid grid-cols-1 grid-rows-3 gap-4 sm:grid-cols-3">
        <div className="col-span-3">
          <button
            type="button"
            className="bk-btn-primary w-full"
            onClick={onAdd}
          >
            {addLabel}
          </button>
        </div>
          <SortButton
            className=""
            mediaType={mediaType}
            value={sortKey}
            onChange={setSortKey}
          />
          <GenreFilter
            className=""
            mediaType={mediaType}
            value={selectedGenres}
            onChange={setSelectedGenres}
          />
          <StatusFilter
            className=""
            mediaType={mediaType}
            value={selectedStatuses}
            onChange={setSelectedStatuses}
          />

        <div className="sm:col-span-2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="sm-col-span-1">
          <button
            type="button"
            className="bk-btn-outline text-light w-full"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
