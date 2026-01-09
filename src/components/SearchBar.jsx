//Component for searching books

import React, { useMemo, useEffect, useState } from "react";
import { debounce } from "lodash";
import api from "../services/api";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const [inputValue, setInputValue] = useState(searchQuery || "");

    useEffect(() => {
        setInputValue(searchQuery || "");
    }, [searchQuery]);

    const debouncedSetSearchQuery = useMemo(
        () => debounce((value) => setSearchQuery(value), 150),
        [setSearchQuery]
    );

    useEffect(() => {
        return () => debouncedSetSearchQuery.cancel();
    }, [debouncedSetSearchQuery]);

    const onChange = (e) => {
        const v = e.target.value;
        setInputValue(v);
        debouncedSetSearchQuery(v);
    };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="search" className="bk-label mb-0 text-dark">
        Search
      </label>
      <input
        id="search"
        type="text"
        className="bk-input max-w-xs"
        value={inputValue}
        onChange={onChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
