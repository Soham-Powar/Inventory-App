// populatedb.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://kratos:Soham%231345@localhost:5432/top_movies",
});

async function populate() {
  try {
    // Clean up old data (order matters because of foreign keys)
    await pool.query("DELETE FROM film_actors");
    await pool.query("DELETE FROM films");
    await pool.query("DELETE FROM actors");
    await pool.query("DELETE FROM genres");

    // Insert genres
    const genres = ["Action", "Comedy", "Drama", "Sci-Fi"];
    const genreIds = [];
    for (const g of genres) {
      const res = await pool.query(
        "INSERT INTO genres (name, description) VALUES ($1, $2) RETURNING id",
        [g, `${g} movies`]
      );
      genreIds.push(res.rows[0].id);
    }

    // Insert films
    const filmsData = [
      ["Inception", "A mind-bending thriller.", 2010, 8.8, false, genreIds[3]], // Sci-Fi
      ["The Dark Knight", "Batman vs Joker.", 2008, 9.0, true, genreIds[0]], // Action
      [
        "Forrest Gump",
        "Life is like a box of chocolates.",
        1994,
        8.6,
        true,
        genreIds[2],
      ], // Drama
      ["The Hangover", "A wild night in Vegas.", 2009, 7.7, false, genreIds[1]], // Comedy
    ];
    const filmIds = [];
    for (const f of filmsData) {
      const res = await pool.query(
        `INSERT INTO films (title, description, release_year, rating, watched, genre_id)
         VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
        f
      );
      filmIds.push(res.rows[0].id);
    }

    // Insert actors
    const actorsData = [
      ["Leonardo DiCaprio", 1974, "USA"],
      ["Christian Bale", 1974, "UK"],
      ["Tom Hanks", 1956, "USA"],
      ["Bradley Cooper", 1975, "USA"],
    ];
    const actorIds = [];
    for (const a of actorsData) {
      const res = await pool.query(
        "INSERT INTO actors (name, birth_year, nationality) VALUES ($1,$2,$3) RETURNING id",
        a
      );
      actorIds.push(res.rows[0].id);
    }

    // Link films ↔ actors
    const filmActorsData = [
      [filmIds[0], actorIds[0]], // Inception → Leonardo
      [filmIds[1], actorIds[1]], // Dark Knight → Christian Bale
      [filmIds[2], actorIds[2]], // Forrest Gump → Tom Hanks
      [filmIds[3], actorIds[3]], // Hangover → Bradley Cooper
      [filmIds[0], actorIds[1]], // Inception → Christian Bale (fake link for demo)
    ];
    for (const fa of filmActorsData) {
      await pool.query(
        "INSERT INTO film_actors (film_id, actor_id) VALUES ($1,$2)",
        fa
      );
    }

    console.log("Database populated successfully!");
  } catch (err) {
    console.error("Error populating database:", err);
  } finally {
    await pool.end();
  }
}

populate();
