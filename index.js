const express = require("express");
require("dotenv").config();
const path = require("node:path");
const app = express();

const genreRouter = require("./routes/genreRouter");
const actorRouter = require("./routes/actorRouter");
const filmRouter = require("./routes/filmRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use("/genres", genreRouter);
app.use("/actors", actorRouter);
app.use("/films", filmRouter);

app.get("/", (req, res) => {
  res.render("welcome");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`here we go ${PORT}`);
});
