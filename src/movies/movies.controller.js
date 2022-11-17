const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//VALIDATION Middleware for "read"." a movie", not "movies"
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}
//list all movies. If the req has "is_showing" as param, it return only the movies that are currently showing
async function list(req, res, next) {
  let showing = req.query.is_showing;
  console.log(showing); //true
  let data;
  showing
    ? (data = await service.listIsShowing())
    : (data = await service.list());

  res.json({ data: data });
}
//In the event where `is_showing=true` is provided, the route should return _only those movies where the movie is currently showing in theaters._ This means you will need to check the `movies_theaters` table.
//Function to return a movie from the given movieId
function read(req, res) {
  res.json({ data: res.locals.movie });
}
//Function read to return all theaters where the movie from a given movieId is being played
async function listTheaters(req, res, next) {
  const data = await service.listTheaters(res.locals.movie.movie_id);
  res.json({ data: data });
}
//Func to return all reviews from the movie
async function listReviews(req, res, next) {
  const data = await service.listReviews(Number(res.locals.movie.movie_id));
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
};
