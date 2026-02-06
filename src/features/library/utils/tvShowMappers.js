export function formToTVShowPayload(formData) {
  const toList = (s) =>
    String(s ?? "")
      .split(";")
      .map((x) => x.trim())
      .filter(Boolean);

  return {
    title: String(formData.title ?? "").trim(),

    creator: toList(formData.creator),
    showRunner: toList(formData.showRunner),
    writers: toList(formData.writers),
    network: toList(formData.network),
    actors: toList(formData.actors),
    genres: toList(formData.genres),
    musicBy: toList(formData.musicBy),
    execProducers: toList(formData.execProducers),
    producers: toList(formData.producers),
    cinematography: toList(formData.cinematography),
    cameraSetup: toList(formData.cameraSetup),
    avgRuntime: formData.avgRuntime,
    productionCompanies: toList(formData.productionCompanies),
    language: formData.language,
    country: formData.country,
    stillRunning:
      formData.stillRunning === true || formData.stillRunning === "true",
    startDate: formData.startDate,
    endDate: formData.endDate,
    seasons:
      formData.seasons === "" || formData.seasons == null
        ? null
        : Number(formData.seasons),
    episodes:
      formData.episodes === "" || formData.episodes == null
        ? null
        : Number(formData.episodes),
    basedOn: formData.basedOn,
    status: formData.status,
    // dateAdded: if blank, let schema default Date.now handle it
    ...(formData.dateAdded ? { dateAdded: new Date(formData.dateAdded) } : {}),

    ...(formData.status === "watched" && formData.dateFinished
      ? { dateFinished: new Date(formData.dateFinished) }
      : { dateFinished: null }),
    dateStarted: formData.dateStarted,
  };
}

export function tvShowToFormData(tvShow) {
  return {
    title: tvShow.title || "",
    creator: (tvShow.creator || []).join("; "),
    showRunner: (tvShow.showRunner || []).join("; "),
    writers: (tvShow.writers || []).join("; "),
    actors: (tvShow.actors || []).join("; "),
    genres: (tvShow.genres || []).join("; "),
    musicBy: (tvShow.musicBy || []).join("; "),
    execProducers: (tvShow.execProducers || []).join("; "),
    producers: (tvShow.producers || []).join("; "),
    cinematography: (tvShow.cinematography || []).join("; "),
    cameraSetup: (tvShow.cameraSetup || []).join("; "),
    avgRuntime: tvShow.avgRuntime || "",
    productionCompanies: (tvShow.productionCompanies || []).join("; "),
    language: tvShow.language || "",
    country: tvShow.country || "",
    stillRunning: !!tvShow.stillRunning,
    screenwriter: (tvShow.screenwriter || []).join("; "),
    startDate: tvShow.startDate || "",
    endDate: tvShow.endDate || "",
    seasons: tvShow.seasons == null ? "" : String(tvShow.seasons),
    episodes: tvShow.episodes || "",
    network: tvShow.network || "",
    basedOn: tvShow.basedOn || "",
    status: tvShow.status || "",
    dateAdded: tvShow.dateAdded
      ? new Date(tvShow.dateAdded).toISOString().slice(0, 10)
      : "",
    dateFinished: tvShow.dateFinished
      ? new Date(tvShow.dateFinished).toISOString().slice(0, 10)
      : "",
    dateStarted: tvShow.dateStarted || "",
  };
}
