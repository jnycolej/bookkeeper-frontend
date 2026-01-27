export function formToMoviePayload(formData) {

    const toList = (s) =>
        String(s ?? "")
            .split(";")
            .map((x) => s.trim())
            .filter(Boolean);

return {
    title: String(formData.title ?? "").trim(),

    director: toList(formData.director),

    // ✅ accept either actor (current form) or actors (schema-friendly)
    actors: toList(formData.actors ?? formData.actor),

    genres: toList(formData.genres),

    series: String(formData.series ?? "").trim() || null,
    seriesNum:
      formData.seriesNum === "" || formData.seriesNum == null
        ? null
        : Number(formData.seriesNum),

    releaseYear:
      formData.releaseYear === "" || formData.releaseYear == null
        ? null
        : Number(formData.releaseYear),

    duration:
      formData.duration === "" || formData.duration == null
        ? null
        : Number(formData.duration),

    status: formData.status,
    format: formData.format || null,
    rating: formData.rating ? Number(formData.rating) : null,

    // dateAdded: if blank, let schema default Date.now handle it
    ...(formData.dateAdded ? { dateAdded: new Date(formData.dateAdded) } : {}),

    ...(formData.status === "watched" && formData.dateFinished
      ? { dateFinished: new Date(formData.dateFinished) }
      : { dateFinished: null }),
  };
}

export function movieToFormData(movie) {
  return {
    title: movie.title || "",
    series: movie.series || "",
    seriesNum: movie.seriesNum == null ? "" : String(movie.seriesNum),
    director: (movie.director || []).join("; "),
    actors: (movie.actors || []).join("; "),
    screenwriter: (movie.screenwriter || []).join("; "),
    genres: (movie.genres || []).join("; "),
    releaseYear: movie.releaseYear || "",
    duration: movie.duration || "",
    status: movie.status || "",
    format: movie.format || "",
    rating: movie.rating ?? "",
    dateAdded: movie.dateAdded
      ? new Date(movie.dateAdded).toISOString().slice(0, 10)
      : "",
    dateFinished: movie.dateFinished
      ? new Date(movie.dateFinished).toISOString().slice(0, 10)
      : "",
  };
}
