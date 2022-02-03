const express = require("express");
const cors = require("cors");
const movies = require("./data/movies");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Escribimos los endpoints
server.get("/movies", (req, res) => {
  const genderFilterParam = req.query.gender;
  const response = {
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
  res.json(genderFilterParam === '' ? response : filteredMovies);
});

// servidor de estáticos
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

const staticServerPhotos = "./src/public-movies-images";
server.use(express.static(staticServerPhotos));
