const pool = require("../pool");

async function getAllActors() {
  const { rows } = await pool.query("SELECT * FROM actors ORDER BY name");
  return rows;
}

async function getActorById(id) {
  const { rows } = await pool.query("SELECT * FROM actors WHERE id = $1", [id]);
  return rows[0];
}

async function addActor({ name, birth_year, nationality }) {
  await pool.query(
    `INSERT INTO actors (name, birth_year, nationality)
	   VALUES ($1, $2, $3)`,
    [name, birth_year, nationality]
  );
}

async function updateActor(id, { name, birth_year, nationality }) {
  await pool.query(
    `UPDATE actors
	   SET name = $1, birth_year = $2, nationality = $3
	   WHERE id = $4`,
    [name, birth_year, nationality, id]
  );
}

async function deleteActor(id) {
  await pool.query("DELETE FROM actors WHERE id = $1", [id]);
}

// film - actor join table

async function linkActorToFilm(filmId, actorId) {
  await pool.query(
    "INSERT INTO film_actors (film_id, actor_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [filmId, actorId]
  );
}

async function unlinkActorFromFilm(filmId, actorId) {
  await pool.query(
    "DELETE FROM film_actors WHERE film_id = $1 AND actor_id = $2",
    [filmId, actorId]
  );
}

async function getActorsForFilm(filmId) {
  const { rows } = await pool.query(
    `SELECT a.*
     FROM actors a
     JOIN film_actors fa ON a.id = fa.actor_id
     WHERE fa.film_id = $1`,
    [filmId]
  );
  return rows;
}

async function getFilmsForActor(actorId) {
  const { rows } = await pool.query(
    `SELECT f.*
     FROM films f
     JOIN film_actors fa ON f.id = fa.film_id
     WHERE fa.actor_id = $1`,
    [actorId]
  );
  return rows;
}

module.exports = {
  getAllActors,
  getActorById,
  addActor,
  updateActor,
  deleteActor,
  linkActorToFilm,
  unlinkActorFromFilm,
  getActorsForFilm,
  getFilmsForActor,
};
