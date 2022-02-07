const express = require("express");
const cors = require("cors");
//const movies = require("./data/movies");
const Database = require("better-sqlite3");

const db = new Database("./src/db/database.db", { verbose: console.log });

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set("view engine", "ejs");

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Escribimos los endpoints
server.get("/movies", (req, res) => {
  const genderFilterParam = req.query.gender;
  const query = db.prepare("SELECT*FROM movies WHERE gender= ?");
  const moviesFiltered = query.all(genderFilterParam);

  const query2 = db.prepare("SELECT*FROM movies");
  const allMovies = query2.all();

  res.json(genderFilterParam === "" ? allMovies : moviesFiltered);

  /*const response = {
    success: true,
    movies: movies,
  };
  const filteredMovies = {
    success: true,
    movies: response.movies.filter(
      (movie) => movie.gender === genderFilterParam
    ),
  };
  console.log(filteredMovies);
  res.json(genderFilterParam === '' ? response : filteredMovies);*/
});

server.get("/movie/:movieId", (req, res) => {
  console.log(req.params.movieId);
  const requestMovieId = req.params.movieId;
  const foundMovie = movies.find((movie) => movie.id === requestMovieId);
  console.log(foundMovie);
  res.render("movie", foundMovie);
});

// servidor de estáticos
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

const staticServerPhotos = "./src/public-movies-images";
server.use(express.static(staticServerPhotos));

const staticServerMovie = "./views/movie";
server.use(express.static(staticServerMovie));
