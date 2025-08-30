const Router = require("express");
const filmRouter = new Router();
const filmController = require("../controllers/filmController");

filmRouter.get("/", filmController.filmsGet);
filmRouter.post("/:id/toggle-watched", filmController.toggleWatched);
// filmRouter.get("/new", filmController.filmsNewGet);
// filmRouter.post("/new", filmController.filmsNewPost);

module.exports = filmRouter;
