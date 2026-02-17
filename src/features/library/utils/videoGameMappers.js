// /features/library/utils/videoGameMappers.js

const splitSemi = (val) =>
  String(val ?? "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

const yearToDate = (year) => {
  const n = Number(year);
  if (!Number.isFinite(n) || n <= 0) return null;
  return new Date(`${n}-01-01T00:00:00.000Z`);
};

const dateToYearString = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return String(dt.getUTCFullYear());
};

/**
 * FORM → API (submit)
 */
export function formToVideoGamePayload(formData) {
  return {
    title: String(formData.title ?? "").trim(),

    series: String(formData.series ?? "").trim() || null,
    seriesNum:
      formData.seriesNum === "" || formData.seriesNum == null
        ? null
        : Number(formData.seriesNum),

    developer: splitSemi(formData.developer), // ✅ array + required
    publisher: splitSemi(formData.publisher), // ✅ array
    designer: splitSemi(formData.designer),
    programmers: splitSemi(formData.programmers),
    artist: splitSemi(formData.artist),
    writers: splitSemi(formData.writers),
    composer: splitSemi(formData.composer),

    engine: String(formData.engine ?? "").trim() || null,

    platforms: splitSemi(formData.platforms),
    actors: splitSemi(formData.actors), // ✅ array + required
    genres: splitSemi(formData.genres), // ✅ array + required

    country: splitSemi(formData.country),
    mode: splitSemi(formData.mode),

    releaseYear:
      formData.releaseYear === "" || formData.releaseYear == null
        ? null
        : Number(formData.releaseYear),

    duration: formData.duration ? Number(formData.duration) : null,

    format: formData.format, // or keep as single select -> [value]
    status: String(formData.status ?? "").trim(),
    rating: formData.rating ? Number(formData.rating) : null,

    dateAdded: formData.dateAdded ? new Date(formData.dateAdded) : null,
    dateStarted: formData.dateStarted ? new Date(formData.dateStarted) : null,
    dateFinished: formData.dateFinished
      ? new Date(formData.dateFinished)
      : null,
  };
}

/**
 * API → FORM (edit)
 */
export function videoGameToFormData(videogame) {
  return {
    title: videogame.title || "",
    series: videogame.series || "",
    seriesNum: videogame.seriesNum == null ? "" : String(videogame.seriesNum),

    developer: (videogame.developer || []).join("; "),
    publisher: (videogame.publisher || []).join("; "),
    designer: (videogame.designer || []).join("; "),
    programmers: (videogame.programmers || []).join("; "),
    artist: (videogame.artist || []).join("; "),
    writers: (videogame.writers || []).join("; "),
    composer: (videogame.composer || []).join("; "),
    actors: (videogame.actors || []).join("; "),

    engine: videogame.engine || "",
    platforms: (videogame.platforms || []).join("; "),

    // schema genre -> form genres
    genres: (videogame.genres || []).join("; "),

    country: (videogame.country || []).join("; "),
    mode: (videogame.mode || []).join("; "),

    // schema Date -> year number input
    releaseYear: dateToYearString(videogame.releaseYear),

    duration: videogame.duration ?? "",
    format: videogame.format ?? "",
    status: videogame.status || "",
    rating: videogame.rating ?? "",

    dateAdded: videogame.dateAdded
      ? new Date(videogame.dateAdded).toISOString().slice(0, 10)
      : "",
    dateStarted: videogame.dateStarted
      ? new Date(videogame.dateStarted).toISOString().slice(0, 10)
      : "",
    dateFinished: videogame.dateFinished
      ? new Date(videogame.dateFinished).toISOString().slice(0, 10)
      : "",
  };
}
