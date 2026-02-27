import { countBy } from "lodash";

export function formToMoviePayload(formData) {

    const toList = (s) =>
        String(s ?? "")
            .split(";")
            .map((x) => s.trim())
            .filter(Boolean);

return {
    title: String(formData.title ?? "").trim(),

    director: toList(formData.director),
    screenwriter: toList(formData.screenwriter),
    studio: formData.studio,
    productionCompany: toList(formData.productionCompany),
    // ✅ accept either actor (current form) or actors (schema-friendly)
    actors: toList(formData.actors ?? formData.actor),
    genres: toList(formData.genres),
    duration:
      formData.duration === "" || formData.duration == null
        ? null
        : Number(formData.duration),
    releaseYear:
      formData.releaseYear === "" || formData.releaseYear == null
        ? null
        : Number(formData.releaseYear),   
    status: formData.status,
    rewatchCount: formData.rewatchCount || 0,
    format: formData.format || null,           
    series: String(formData.series ?? "").trim() || null,
    seriesNum:
      formData.seriesNum === "" || formData.seriesNum == null
        ? null
        : Number(formData.seriesNum),
    rating: formData.rating ? Number(formData.rating) : null,
    ...(formData.status === "watched" && formData.dateFinished
      ? { dateFinished: new Date(formData.dateFinished) }
      : { dateFinished: null }),
    // dateAdded: if blank, let schema default Date.now handle it
    ...(formData.dateAdded ? { dateAdded: new Date(formData.dateAdded) } : {}),
storyBy: toList(formData.storyBy),
producers: toList(formData.producers),
cinematography: toList(formData.cinematography),
musicBy: formData.musicBy,
country: toList(formData.country)

  };
}

export function movieToFormData(movie) {
  return {
    title: movie.title || "",
    director: (movie.director || []).join("; "),
    screenwriter: (movie.screenwriter || []).join("; "),
    studio: movie.studio || "",
    actors: (movie.actors || []).join("; "),
    genres: (movie.genres || []).join("; "),
    duration: movie.duration || "",
    releaseYear: movie.releaseYear || "",
    status: movie.status || "",
    format: movie.format || "",
    series: movie.series || "",
    seriesNum: movie.seriesNum == null ? "" : String(movie.seriesNum),
    rating: movie.rating ?? "",
    dateFinished: movie.dateFinished
      ? new Date(movie.dateFinished).toISOString().slice(0, 10)
      : "",    
    dateAdded: movie.dateAdded
      ? new Date(movie.dateAdded).toISOString().slice(0, 10)
      : "",
    storyBy: (movie.storyBy || []).join("; "),
    producers: (movie.producers || []).join("; "),
    cinematography: (movie.cinematography || []).join("; "),
    musicBy: movie.musicBy || "",
    country: (movie.country || "").join("; "),

  };
}
