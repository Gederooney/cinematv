import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import Layout from "../src/components/Layout";

function turn(x) {
  var i = 0;
  while (i < x.length / 2) {
    var temp = x[i];
    x[i] = x[x.length - i - 1];
    x[x.length - i - 1] = temp;
    i++;
  }
  return 1;
}

function HomePage({ movies }) {

  return (
    (
      <Layout>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2  g-2 g-lg-3 g-md-2">
                {movies &&
                  movies.map((movie) => {
                    return (
                      <div className="col" key={movie.id}>
                        <div className="card single_movie_card p-2">
                          <Link href={`/movies/${movie.id}`}>
                            <a>
                              <div className="col single_movie_img my-2">
                                <img
                                  className="card-img-top"
                                  src={
                                    (movie.isIframe &&
                                      `https://img.youtube.com/vi/${movie.poster}/0.jpg`) ||
                                    `https://cdn.videas.fr/v-medias/${movie.poster}`
                                  }
                                  alt={`${movie.title} Nollywood film nigérian en français`}
                                  title={movie.title.toUpperCase()}
                                />
                              </div>
                            </a>
                          </Link>
                          <Link href={`/movies/${movie.id}`}>
                            <a
                              className="card mb-2 movie_infos"
                              title={movie.title.toUpperCase()}
                            >
                              <span className="home_movie_title">
                                <span></span>
                                <span>
                                  {(movie.title.length > 12 &&
                                    `${movie.title
                                      .toUpperCase()
                                      .slice(0, 12)}...`) ||
                                    movie.title.toUpperCase()}
                                </span>
                              </span>
                              <span className="home_movie_title">
                                <span></span>
                                <span>{movie.type.toUpperCase()}</span>
                              </span>
                              <span className="home_movie_title">
                                <span>Durée:</span>
                                <span>{`${Math.floor(movie.duration / 60)}h${
                                  movie.duration - 60
                                }min`}</span>
                              </span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    ) || <div>Loading</div>
  );
}
HomePage.propTypes = {
  movies: PropTypes.array.isRequired,
};

export async function getServerSideProps() {
  try {
    const res = await fetch(`https://ronystv.com/api/movies`);
    const { data } = await res.json();
    return { props: { movies: data } };
  } catch (error) {
    console.log(error.message);
    return { props: { data: [] } };
  }
}

export default HomePage;
