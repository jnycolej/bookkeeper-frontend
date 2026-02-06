import GenreFilter from "@/components/GenreFilter";
import StatusFilter from "@/components/StatusFilter";
import SearchBar from "@/components/SearchBar";
import SortButton from "@/components/SortButton";

export const LibraryControlCenter = ({mediaType, setSortKey, setSelectedGenres, setSelectedStatuses, searchQuery, setSearchQuery, clearFilters}) => {
  return (
    <div className="mb-4 rounded-2xl bg-dark/70 p-4 text-light backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <button
          type="button"
          className="bk-btn-primary w-full"
          onClick={() => navigate(`/library/${mediaType}/new`)}
        >
          Add ${mediaType}
        </button>

        <SortButton handleSort={setSortKey} />
        <GenreFilter handleFilter={setSelectedGenres} />
        <StatusFilter handleFilter={setSelectedStatuses} />

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
