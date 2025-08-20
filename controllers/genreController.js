const db = require("../db/queries/genres");

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await db.getAllGenres();
    res.json(genres);
  } catch (err) {
    console.error(err);
    //to be done
  }
};

exports.getGenreById = async (req, res) => {
  try {
    const genre = await db.getGenreById(req.params.id);
    if (!genre) {
      //404
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(genre);
  } catch (err) {
    console.log(err);
    //
  }
};
