const knex = require("../db/connection");
const addCritic = require("../utils/map-properties");
//Query List all Movies from Movies table
function list() {
  return knex("movies").select("*");
}
//Query List all Movies that has "is_showing" as true
function listIsShowing() {
  return knex("movies as m")
    .select("m.*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .groupBy("m.movie_id")
    .where({ "mt.is_showing": true });
}
//Query to return a Movie by a giving ID
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}
//Query that return all theaters where a given Movie is playing.
//movies/:movieId/theaters
function listTheaters(movie_id) {
  return knex("movies_theaters as mt")
    .where({ "mt.movie_id": movie_id })
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing");
}

function listReviews(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "r.movie_id": movie_id })
    .select(
      "r.*",
      "c.critic_id as critic.critic_id",
      "c.preferred_name as critic.preferred_name",
      "c.surname as critic.surname",
      "c.organization_name as critic.organization_name"
    )
    .then(addCritic);
}

module.exports = {
  list,
  listIsShowing,
  read,
  listTheaters,
  listReviews,
};
