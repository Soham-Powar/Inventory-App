const pool = require("../pool");

async function getAllFilms() {
  const { rows } = await pool.query(
    `select f.*, g.name as genre
	from films f
	join genres g on f.genre_id = g.id
	order by f.title`
  );
  return rows;
}

async function getFilmsByGenre(genreName) {
  const { rows } = await pool.query(
    `select f.* 
    from films f
    join genres g on f.genre_id = g.id
    where g.name = $1`,
    [genreName]
  );
  return rows;
}

async function getFilmById(id) {
  const { rows } = await pool.query(
    `select f.*, g.name as genre
		from films f
		join genres g on f.genre_id = g.id
		where f.id = $1`,
    [id]
  );
  return rows[0];
}

async function addFilm({
  title,
  description,
  release_year,
  rating,
  watched,
  genre_id,
}) {
  await pool.query(
    `INSERT INTO films (title, description, release_year, rating, watched, genre_id)
	   VALUES ($1, $2, $3, $4, $5, $6)`,
    [title, description, release_year, rating, watched, genre_id]
  );
}

async function updateFilm(
  id,
  { title, description, release_year, rating, watched, genre_id }
) {
  await pool.query(
    `UPDATE films
	   SET title = $1, description = $2, release_year = $3, rating = $4,
		   watched = $5, genre_id = $6
	   WHERE id = $7`,
    [title, description, release_year, rating, watched, genre_id, id]
  );
}

async function deleteFilm(id) {
  await pool.query("DELETE FROM films WHERE id = $1", [id]);
}

async function updateFilmWatched(filmId, watched) {
  await pool.query("UPDATE films SET watched = $1 WHERE id = $2", [
    watched,
    filmId,
  ]);
}

module.exports = {
  getAllFilms,
  getFilmById,
  addFilm,
  updateFilm,
  deleteFilm,
  updateFilmWatched,
  getFilmsByGenre,
};
