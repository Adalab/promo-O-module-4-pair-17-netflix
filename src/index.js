const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const movies = require("./data/movies");
=======
movies = require("./data/movies");
>>>>>>> main
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
const db = new Database("./src/db/database.db", { verbose: console.log, });

// init and config data base
const db = new Database("./src/db/database.db", {
  verbose: console.log,
});

// Escribimos los endpoints
server.get("/movies", (req, res) => {
<<<<<<< HEAD
  //const genderFilterParam = req.query.gender;

  const query = db.prepare("SELECT*FROM movies");
  const allMovies = query.all();
  const response = {
    success: true,
    movies: allMovies,
  };

  res.json(response);

  //const query2 = db.prepare("SELECT*FROM movies WHERE gender= ?");
  //const moviesFiltered = query2.all(genderFilterParam);

  //res.json(genderFilterParam === "" ? allMovies : moviesFiltered);
=======

  const genderFilterParam = req.query.gender;

  if(genderFilterParam === ''){
    const queryAllMovies = db.prepare("SELECT * FROM movies");
    const allMovies = queryAllMovies.all();
    return res.json({
      success: true,
      movies: allMovies,
    })
  }else{
    const queryFilterGender = db.prepare("SELECT * FROM movies WHERE gender = ?");
    const moviesFiltered = queryFilterGender.all(genderFilterParam);
    return res.json({
      success: true,
      movies: moviesFiltered,
    })
  }

/*   const queryAllMovies = db.prepare("SELECT * FROM movies");
  const allMovies = queryAllMovies.all(); 
  console.log(allMovies);
  const queryFilterGender = db.prepare("SELECT * FROM movies WHERE gender = ?");
  const moviesFiltered = queryFilterGender.all(genderFilterParam);
  console.log(moviesFiltered);
  res.json(genderFilterParam === "" ? allMovies : moviesFiltered); */

>>>>>>> main

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

server.post("/sign-up", (req, res) => {
  const email = rep.body.email;
  const pass = req.body.password;

  const query 

  INSERT INTO users (email, password) VALUES ("sandsan12@gmail.com" , "12345678")
})

// servidor de estáticos
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

const staticServerPhotos = "./src/public-movies-images";
server.use(express.static(staticServerPhotos));

const staticServerMovie = "./views/movie";
server.use(express.static(staticServerMovie));
