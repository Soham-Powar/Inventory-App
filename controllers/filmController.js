const db = require("../db/queries/films");

exports.filmsGet = async (req, res) => {
  try {
    const films = await db.getAllFilms();
    console.log(films);
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
