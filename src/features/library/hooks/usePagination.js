import { useState, useEffect, useMemo } from "react";

export const usePagination = (items = [], pageSize = 10) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  //keeps page valid even during search or filter
  useEffect(() => {
    setPage((prev) => Math.min(Math.max(1, prev), totalPages));
  }, [totalPages]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const pageItems = useMemo(() => {
    const siblingCount = 1;
    const pages = [];

    const left = Math.max(1, page - siblingCount);
    const right = Math.min(totalPages, page + siblingCount);

    pages.push(1);

    if (left > 2) items.push("ellipsis-left");

    for (let p = Math.max(2, left); p <= Math.min(totalPages - 1, right); p++) {
      pages.push(p);
    }

    if (right < totalPages - 1) pages.push("ellipsis-right");

    //always show last (if more than 1 page)
    if (totalPages > 1) pages.push(totalPages);

    //remove duplicates
    return pages.filter((v, i, arr) => arr.indexOf(v) === i);
  }, [page, totalPages]);

  const startItem = items.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, items.length);

  const goTo = (p) => setPage(Math.min(totalPages, Math.max(1, p)));

  return {
    page,
    totalPages,
    pagedItems, // the items for the current page
    pageItems, // [1, "ellipsis-left", 4, 5, 6, "ellipsis-right", 10]
    startItem,
    endItem,
    setPage,
    goTo,
  };
};
