
export function mapGoogleBookToBookForm(book) {
  const volume = book.volumeInfo || {};
  const identifiers = volume.industryIdentifiers || [];

  const isbn10 =
    identifiers.find((id) => id.type === "ISBN_10")?.identifier || "";
  const isbn13 =
    identifiers.find((id) => id.type === "ISBN_13")?.identifier || "";

  return {
    title: volume.title || "",
    author: (volume.authors || []).join("; "),
    genres: (volume.categories || []).join("; "),
    isbn10,
    isbn13,
    publicationYear: volume.publishedDate?.slice(0, 4) || "",
    pageCount: volume.pageCount || "",
  };
}

export function mapTmdbMovieToMovieForm(movie) {
  const credits = movie.credits || {};
  const crew = credits.crew || [];
  const cast = credits.cast || [];

  const namesByJob = (job) =>
    crew
      .filter((person) => person.job === job)
      .map((person) => person.name)
      .join("; ");

  return {
    title: movie.title || "",
    director: namesByJob("Director"),
    screenwriter: crew
      .filter((person) => ["Screenplay", "Writer"].includes(person.job))
      .map((person) => person.name)
      .join("; "),
    storyBy: crew
      .filter((person) => person.job === "Story")
      .map((person) => person.name)
      .join("; "),
    producers: crew
      .filter((person) => person.job === "Producer")
      .map((person) => person.name)
      .join("; "),
    cinematography: namesByJob("Director of Photography"),
    country: (movie.production_countries || []).map((c) => c.name).join("; "),
    actors: cast
      .slice(0, 10)
      .map((person) => person.name)
      .join("; "),
    genres: (movie.genres || []).map((g) => g.name).join("; "),
    musicBy: namesByJob("Original Music Composer"),
    productionCompany: (movie.production_companies || [])
      .map((c) => c.name)
      .join("; "),
    studio: (movie.production_companies || []).map((c) => c.name).join("; "),
    releaseYear: movie.release_date?.slice(0, 4) || "",
    duration: movie.runtime || "",
  };
}

export function mapTmdbTvToTvForm(show) {
  const credits = show.aggregate_credits || show.credits || {};
  const crew = credits.crew || [];
  const cast = credits.cast || [];

  const crewNamesByJob = (job) =>
    crew
      .filter((person) => person.job === job)
      .map((person) => person.name)
      .join("; ");

  return {
    title: show.name || "",
    creator: (show.created_by || []).map((p) => p.name).join("; "),
    showRunner: crewNamesByJob("Showrunner"),
    execProducers: crew
      .filter((person) => person.job === "Executive Producer")
      .map((person) => person.name)
      .join("; "),
    producers: crew
      .filter((person) => person.job === "Producer")
      .map((person) => person.name)
      .join("; "),
    cinematography: crew
      .filter((person) => person.job === "Director of Photography")
      .map((person) => person.name)
      .join("; "),
    cameraSetup: "",
    writers: crew
      .filter((person) => ["Writer", "Screenplay"].includes(person.job))
      .map((person) => person.name)
      .join("; "),
    network: (show.networks || []).map((n) => n.name).join("; "),
    productionCompanies: (show.production_companies || [])
      .map((c) => c.name)
      .join("; "),
    actors: cast
      .slice(0, 10)
      .map((person) => person.name)
      .join("; "),
    musicBy: crew
      .filter((person) => person.job === "Original Music Composer")
      .map((person) => person.name)
      .join("; "),
    genres: (show.genres || []).map((g) => g.name).join("; "),
    language: (show.spoken_languages || [])
      .map((l) => l.english_name)
      .join("; "),
    country: (show.origin_country || []).join("; "),
    stillRunning: show.in_production ?? false,
    startDate: show.first_air_date || "",
    endDate: show.last_air_date || "",
    seasons: show.number_of_seasons || "",
    episodes: show.number_of_episodes || "",
    avgRuntime: show.episode_run_time?.[0] || "",
    basedOn: "",
  };
}

export function mapIgdbGameToVideoGameForm(game) {
  const involvedCompanies = game.involved_companies || [];

  const companiesByRole = (roleKey) =>
    involvedCompanies
      .filter((c) => c[roleKey] && c.company?.name)
      .map((c) => c.company.name)
      .join("; ");

  return {
    title: game.name || "",
    developer: companiesByRole("developer"),
    publisher: companiesByRole("publisher"),
    designer: (game.designers || []).map((p) => p.name).join("; "),
    programmers: (game.programmers || []).map((p) => p.name).join("; "),
    artist: (game.artists || []).map((p) => p.name).join("; "),
    writers: (game.writers || []).map((p) => p.name).join("; "),
    composer: (game.composers || []).map((p) => p.name).join("; "),
    engine: (game.game_engines || []).map((e) => e.name).join("; "),
    platforms: (game.platforms || []).map((p) => p.name).join("; "),
    actors: (game.voice_actors || []).map((p) => p.name).join("; "),
    genres: (game.genres || []).map((g) => g.name).join("; "),
    country: "",
    mode: (game.game_modes || []).map((m) => m.name).join("; "),
    releaseYear: game.first_release_date
      ? new Date(game.first_release_date * 1000).getFullYear()
      : "",
    duration: "",
  };
}
