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
