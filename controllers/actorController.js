const db = require("../db/queries/actors");

exports.actorsGet = async (req, res) => {
  try {
    const actors = await db.getAllActors();
    res.render("actors/index", { actors });
  } catch (err) {
    console.error(err);
  }
};

exports.actorsNewGet = async (req, res) => {
  res.render("actors/new");
};

exports.actorsNewPost = async (req, res) => {
  const { name, birth_year, nationality } = req.body;
  console.log(req.body);
  try {
    await db.addActor({ name, birth_year, nationality });
    //gap in the db id genre
    res.redirect("/actors");
  } catch (err) {
    //do proper error handling
    res.redirect("/actors");
    console.error(err);
  }
};
