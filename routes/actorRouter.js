const Router = require("express");
const actorRouter = new Router();
const actorController = require("../controllers/actorController");

actorRouter.get("/", actorController.actorsGet);
actorRouter.get("/new", actorController.actorsNewGet);
actorRouter.post("/new", actorController.actorsNewPost);

module.exports = actorRouter;
