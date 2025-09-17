const db = require("../db/queries/genres");
const moviesDb = require("../db/queries/films");

exports.genresGet = async (req, res) => {
  try {
    const genres = await db.getAllGenres();
    res.render("genres/index", { genres });
  } catch (err) {
    console.error(err);
    //to be done
  }
};

exports.genresIdGet = async (req, res) => {
  try {
    const genre = await db.getGenreById(req.params.id);

    if (!genre) {
      //404
      return res.status(404).json({ error: "Genre not found" });
    }

    const films = await moviesDb.getFilmsByGenre(genre.name);

    res.render("genres/genre", { genre, films });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
    //
  }
};

exports.genresNewGet = async (req, res) => {
  res.render("genres/new");
};

exports.genresNewPost = async (req, res) => {
  const { name, description } = req.body;
  try {
    await db.addGenre({ name, description });
    //gap in the db id genre
    res.redirect("/genres");
  } catch (err) {
    //do proper error handling
    res.redirect("/genres");
    console.error(err);
  }
};

// hello i am the creator's girlfriend, if you are reading this, stay away from him!!! 😡
