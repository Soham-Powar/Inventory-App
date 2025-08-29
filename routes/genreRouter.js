const Router = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController");

genreRouter.get("/", genreController.genresGet);
genreRouter.get("/new", genreController.genresNewGet);
genreRouter.post("/new", genreController.genresNewPost);
genreRouter.get("/:id", genreController.genresIdGet);

module.exports = genreRouter;
