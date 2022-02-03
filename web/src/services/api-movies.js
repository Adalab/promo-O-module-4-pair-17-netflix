// login

const getMoviesFromApi = (data) => {
  console.log("Se están pidiendo las películas de la app");
  const gender = data.gender;
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`//localhost:4000/movies?gender=${gender}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;