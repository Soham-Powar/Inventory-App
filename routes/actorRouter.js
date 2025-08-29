const Router = require("express");
const actorRouter = new Router();
const actorController = require("../controllers/actorController");

actorRouter.get("/", actorController.actorsGet);

module.exports = actorRouter;
