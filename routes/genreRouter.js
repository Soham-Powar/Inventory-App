const Router = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController");

genreRouter.get("/", genreController.getAllGenres);

module.exports = genreRouter;
