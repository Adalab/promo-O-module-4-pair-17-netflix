const express = require("express");
const cors = require("cors");
movies = require("./data/movies");
const Database = require("better-sqlite3");

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
const db = new Database("./src/db/database.db", { verbose: console.log });

// Escribimos los endpoints
server.get("/movies", (req, res) => {
  const genderFilterParam = req.query.gender;

  if (genderFilterParam === "") {
    const queryAllMovies = db.prepare("SELECT * FROM movies");
    const allMovies = queryAllMovies.all();
    return res.json({
      success: true,
      movies: allMovies,
    });
  } else {
    const queryFilterGender = db.prepare(
      "SELECT * FROM movies WHERE gender = ?"
    );
    const moviesFiltered = queryFilterGender.all(genderFilterParam);
    return res.json({
      success: true,
      movies: moviesFiltered,
    });
  }

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

server.post("/login", (req, res) => {
  const query = db.prepare(
    "SELECT * FROM users WHERE email = ? AND password = ?"
  );
  const foundUser = query.get(req.body.email, req.body.password);
  if (foundUser) {
    res.json({
      success: true,
      userId: foundUser.id,
    });
  } else {
    res.json({
      success: false,
      errorMessage: "Usuaria no encontrada",
    });
  }
});

server.post("/sign-up", (req, res) => {
  const query = db.prepare("SELECT * FROM users WHERE email = ?");
  const foundUser = query.get(req.body.email);

  if (foundUser) {
    res.json({
      success: false,
      errorMessage: "Usuaria ya existente",
    });
  } else {
    const query = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)"
    );
    const result = query.run(req.body.email, req.body.password);
    console.log(result);
    res.json({
      success: true,
      idUser: result.lastInsertRowid,
    });
  }
});

// servidor de estáticos
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

const staticServerPhotos = "./src/public-movies-images";
server.use(express.static(staticServerPhotos));

const staticServerMovie = "./views/movie";
server.use(express.static(staticServerMovie));
