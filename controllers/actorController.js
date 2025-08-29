const db = require("../db/queries/actors");

exports.actorsGet = async (req, res) => {
  try {
    const actors = await db.getAllActors();
    res.render("actors/index", { actors });
  } catch (err) {
    console.error(err);
  }
};
