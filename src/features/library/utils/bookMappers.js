export function formToBookPayload(formData) {
  const authors = formData.author
    .split(";")
    .map((a) => a.trim())
    .filter(Boolean);

  const genres = formData.genres
    .split(";")
    .map((g) => g.trim())
    .filter(Boolean);

  return {
    title: formData.title,
    series: formData.series.trim() || null,
    seriesNum:
      formData.seriesNum === "" || formData.seriesNum == null
        ? null
        : Number(formData.seriesNum),
    author: authors,
    genres,
    publicationYear: Number(formData.publicationYear),
    pageCount: Number(formData.pageCount),
    status: formData.status,
    rereadCount: formData.rereadCount || 0,
    format: formData.format || null,
    isbn10: formData.isbn10.trim() || null,
    isbn13: formData.isbn13.trim() || null,
    asin: formData.asin.trim() || null,
    rating: formData.rating ? Number(formData.rating) : null,
    kindleUnlimited: formData.kindleUnlimited,
    libby: formData.libby,
    ...(formData.dateAdded && { dateAdded: new Date(formData.dateAdded) }),
    ...(formData.status === "read" && formData.dateFinished
      ? { dateFinished: new Date(formData.dateFinished) }
      : { dateFinished: null }),
  };
}

export function bookToFormData(book) {
  return {
    title: book.title || "",
    series: book.series || "",
    seriesNum: book.seriesNum == null ? "" : String(book.seriesNum),
    author: (book.author || []).join("; "),
    genres: (book.genres || []).join("; "),
    publicationYear: book.publicationYear || "",
    pageCount: book.pageCount || "",
    status: book.status || "",
    format: book.format || "",
    rating: book.rating ?? "",
    isbn10: book.isbn10 || "",
    isbn13: book.isbn13 || "",
    asin: book.asin || "",
    kindleUnlimited: !!book.kindleUnlimited,
    libby: !!book.libby,
    dateAdded: book.dateAdded
      ? new Date(book.dateAdded).toISOString().slice(0, 10)
      : "",
    dateFinished: book.dateFinished
      ? new Date(book.dateFinished).toISOString().slice(0, 10)
      : "",
  };
}
