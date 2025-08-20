const pool = require("../pool");

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY name");
  return rows;
}

async function getGenreById(id) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
  return rows[0];
}

async function addGenre({ name, description }) {
  await pool.query("INSERT INTO genres (name, description) VALUES ($1, $2)", [
    name,
    description,
  ]);
}

async function updateGenre(id, { name, description }) {
  await pool.query(
    "UPDATE genres SET name = $1, description = $2 WHERE id = $3",
    [name, description, id]
  );
}

async function deleteGenre(id) {
  await pool.query("DELETE FROM genres WHERE id = $1", [id]);
}

module.exports = {
  getAllGenres,
  getGenreById,
  addGenre,
  updateGenre,
  deleteGenre,
};
