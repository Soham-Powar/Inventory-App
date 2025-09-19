const db = require("../db/queries/films");
const genreDb = require("../db/queries/genres");

exports.filmsGet = async (req, res) => {
  try {
    const films = await db.getAllFilms();
    // console.log(films);
    res.render("films/index", { films });
  } catch (err) {
    console.error(err);
  }
};

exports.toggleWatched = async (req, res) => {
  const filmId = req.params.id;
  console.log(req.body);
  const watched = req.body.watched === "on";

  try {
    await db.updateFilmWatched(filmId, watched);
    res.redirect("/films"); // reload page
  } catch (err) {
    console.error(err);
    res.send("Error updating watched status");
  }
};

exports.filmsNewGet = async (req, res) => {
  const allGenres = await genreDb.getAllGenres();
  res.render("films/form", { film: null, allGenres });
};

exports.filmsNewPost = async (req, res) => {
  let { title, description, release_year, rating, watched, genre } = req.body;

  watched = watched === "on";
  const genre_id = genre;

  try {
    await db.addFilm({
      title,
      description,
      release_year,
      rating,
      watched,
      genre_id,
    });
    res.redirect("/films");
  } catch (err) {
    console.error(err);
    res.redirect("/films");
  }
};

exports.filmsUpdateGet = async (req, res) => {
  const filmId = req.params.id;
  const film = await db.getFilmById(filmId);
  const allGenres = await genreDb.getAllGenres();

  res.render("films/form", { film, allGenres });
};

exports.filmsUpdatePost = async (req, res) => {
  try {
    const filmId = req.params.id;
    const { title, description, release_year, rating, watched, genre } =
      req.body;

    await db.updateFilm(filmId, {
      title,
      description,
      release_year,
      rating,
      watched: watched === "on",
      genre_id: genre,
    });

    res.redirect("/films");
  } catch (err) {
    console.error("Error updating film:", err);
    res.status(500).send("Server error");
  }
};
