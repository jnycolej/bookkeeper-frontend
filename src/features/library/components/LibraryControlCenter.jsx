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
    <div className="mb-4 mx-auto w-full max-w-6xl rounded-2xl bg-dark/50 p-4 text-light backdrop-blur-sm">
      <div className="flex flex-wrap items-start gap-3">
          <button
            type="button"
            className="bg-primary p-2 rounded-xl text-xl font-semibold"
            onClick={onAdd}
          >
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
            className=""
            mediaType={mediaType}
            value={selectedStatuses}
            onChange={setSelectedStatuses}
          />

        <div className="flex w-full flex-col gap-2 md:ml-auto md:w-auto md:flex-row md:items-center">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div>
          <button
            type="button"
            className="text-stone-50 p-2 border rounded-lg font-semibold hover:bg-rose-900 border-2 tracking-wider"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
