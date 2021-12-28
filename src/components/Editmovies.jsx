import React, { useEffect, useState } from "react";
import axios from "axios";


// styles
import styles from "../assets/css/admin.module.css";

const Editmovies = () => {
  const [movies, setmovies] = useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`https://ronystv.com/api/movies`);
      setmovies(data.data);
    })();
  });
  const deleteMovie = async (id) => {
    const delected = await axios.delete(
      `https://ronystv.com/api/movies/${id}`
    );
    console.log(delected);
  };
  return (
    <div className="row mx-auto">
      {movies &&
        movies.map((movie, idx) => {
          return (
            <div key={movie.id} className={`${styles.singlemovie}`}>
              <div className="row my-2">
                <div className="col-1 d-flex align-items-center justify-content-center">
                  {idx + 1}
                </div>
                <div className="row col-6">
                  <span className="col-8 d-flex align-items-center">
                    {movie.title}
                  </span>
                  <span className="col-2">
                    <img
                      className="img-fluid"
                      src={
                        (movie.isIframe &&
                          `https://img.youtube.com/vi/${movie.poster}/0.jpg`) ||
                        `https://cdn.videas.fr/v-medias/${movie.poster}`
                      }
                      alt={`${movie.title} Nollywood film nigérian en français`}
                    />
                  </span>
                </div>
                <div className="col-3 ms-auto me-0">
                  <button
                    className="btn btn-dark text-danger me-2"
                    onClick={(e) => deleteMovie(movie.id)}
                  >
                    Effacer
                  </button>
                  <button className="btn btn-dark text-sucess">Modifier</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Editmovies;
